import React from "react";
import TextBuilder from "./TextBuilder";

export default function ButtonBuilder({
  el,
  activeBreakpoint,
  activeElements,
  handleUpdate,
  isEditMode,
  isEditModeForText,
  setIsEditModeForText,
}) {
  return (
    <button
      style={
        el?.style?.isCustom
          ? {
              color: `rgba(${el?.style?.customStyle?.textColor?.value?.r}, ${el?.style?.customStyle?.textColor?.value?.g}, ${el?.style?.customStyle?.textColor?.value?.b}, ${el?.style?.customStyle?.textColor?.value?.a})`,
              backgroundColor: `rgba(${el?.style?.customStyle?.backgroundColor?.value?.r}, ${el?.style?.customStyle?.backgroundColor?.value?.g}, ${el?.style?.customStyle?.backgroundColor?.value?.b}, ${el?.style?.customStyle?.backgroundColor?.value?.a})`,
            }
          : {}
      }
      className={`${
        !el?.style?.isCustom && el?.style?.style
      } btn w-full h-full`}
    >
      <TextBuilder
        el={el}
        activeBreakpoint={activeBreakpoint}
        activeElements={activeElements}
        handleUpdate={handleUpdate}
        isEditMode={isEditMode}
        isEditModeForText={isEditModeForText}
        setIsEditModeForText={setIsEditModeForText}
        key={el?._id + "child"}
      />
    </button>
  );
}
