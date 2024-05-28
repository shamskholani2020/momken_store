export const getBackgroundColorProps = (el, fill) => {
  if (!fill) return {}; // Return empty object if no fill data

  const fillVisibility = fill?.options?.visiable;

  const getColorString = (color) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  const applySolidColor = (color) => {
    return {
      backgroundColor: getColorString(color),
    };
  };

  const applyTextColor = (color) => {
    return {
      color: getColorString(color),
    };
  };
  const applyLinearGradient = (gradient) => {
    const { gradientDirection, gradientLevels } = gradient;

    const gradientColors = gradientLevels
      .map((level) => {
        return `${getColorString(level.color)} ${level.position * 100}%`;
      })
      .join(", ");

    const direction =
      {
        t: "top",
        b: "bottom",
        l: "left",
        r: "right",
        tl: "top left",
        tr: "top right",
        bl: "bottom left",
        br: "bottom right",
      }[gradientDirection] || "top"; // Default direction

    return ["text", "heading", "body", "paragraph", "link", "icon"].includes(
      el?.type
    )
      ? {
          backgroundImage: `linear-gradient(to ${direction}, ${gradientColors})`,
          backgroundClip: "text",
          color: "transparent",
        }
      : {
          background: `linear-gradient(to ${direction}, ${gradientColors})`,
        };
  };

  const applyRadialGradient = (gradient) => {
    const { gradientLevels } = gradient;

    const gradientColors = gradientLevels
      .map((level) => {
        return `${getColorString(level.color)} ${level.position * 100}%`;
      })
      .join(", ");

    return {
      backgroundImage: `radial-gradient(${gradientColors})`,
    };
  };

  if (fillVisibility) {
    if (fill.type === "color") {
      return !["text", "heading", "body", "paragraph", "link", "icon"].includes(
        el?.type
      )
        ? applySolidColor(fill.value)
        : applyTextColor(fill.value);
    } else if (fill.type === "gradient") {
      return fill.gradient.gradientType === "linear"
        ? applyLinearGradient(fill.gradient)
        : applyRadialGradient(fill.gradient);
    }
  } else {
    return {};
  }

  return {}; // Default: return empty object if type is not recognized
};
