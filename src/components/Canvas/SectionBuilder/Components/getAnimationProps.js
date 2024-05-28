export function getAnimationProps(animation, isPreviewAppear) {
  if (!animation) {
    return {};
  }

  if (isPreviewAppear) {
    const { type, duration, ease, delay, hidden, visible } = animation;

    const hiddenAndVisible = {};

    Object.keys(hidden).forEach((key) => {
      hiddenAndVisible[key] = [hidden[key] || 0, visible[key] || 0];
    });

    return {
      transition: {
        duration: duration,
        ease: ease,
        delay: delay,
      },

      whileInView: type === "onView" ? hiddenAndVisible : undefined,
      whileHover: type === "onHover" ? hiddenAndVisible : undefined,
      whileTap: type === "onTap" ? hiddenAndVisible : undefined,
      whileDrag: type === "onDrag" ? hiddenAndVisible : undefined,
    };
  }

  return {};
}
