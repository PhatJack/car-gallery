import { gsap } from "gsap";

export function verticalLoop(items, config): gsap.core.Timeline {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startY = items[0].offsetTop,
      times = [],
      heights = [],
      spaceBefore = [],
      yPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if height is 20% the first element's height might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalHeight,
      getTotalHeight = () =>
        items[length - 1].offsetTop +
        (yPercents[length - 1] / 100) * heights[length - 1] -
        startY +
        spaceBefore[0] +
        items[length - 1].offsetHeight *
          gsap.getProperty(items[length - 1], "scaleY") +
        (parseFloat(config.paddingBottom) || 0),
      populateHeights = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
          yPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "y", "px")) / heights[i]) * 100 +
              gsap.getProperty(el, "yPercent"),
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
          b1 = b2;
        });
        gsap.set(items, {
          // convert "y" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
          yPercent: (i) => yPercents[i],
        });
        totalHeight = getTotalHeight();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetHeight / 2)) / totalHeight
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * heights[i]) / 2 / totalHeight -
                timeOffset,
            );
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curY, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curY = (yPercents[i] / 100) * heights[i];
          distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
          distanceToLoop =
            distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
          tl.to(
            item,
            {
              yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0,
          )
            .fromTo(
              item,
              {
                yPercent: snap(
                  ((curY - distanceToLoop + totalHeight) / heights[i]) * 100,
                ),
              },
              {
                yPercent: yPercents[i],
                duration:
                  (curY - distanceToLoop + totalHeight - curY) /
                  pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateHeights();
        deep && populateTimeline();
        populateOffsets();
        tl.progress(progress, true);
      },
      onResize = () => refresh(true);
    gsap.set(items, { y: 0 });
    populateHeights();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}
