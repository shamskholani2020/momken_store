/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { StoreContext } from "../../../context/store/store";
import { Reorder } from "framer-motion";

export const DivBuilder = ({ el }) => {
  const { elements, handleSelect, activeBreakpoint } = useContext(StoreContext);

  return (
    
      <div
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          // setElement(el);

          // elements?.push(el);

          // setElements(() => elements);

          handleSelect(el);
        }}
        style={{
          width: el?.dimensions?.width[activeBreakpoint],
          height: el?.dimensions?.height[activeBreakpoint],

          gap:
            el?.layout[activeBreakpoint]?.gap?.x ==
            el?.layout[activeBreakpoint]?.gap?.y
              ? el?.layout[activeBreakpoint]?.gap?.total
              : `${el?.layout[activeBreakpoint]?.gap?.x} ${el?.layout[activeBreakpoint]?.gap?.y}`,

          ...(el?.layout[activeBreakpoint]?.padding && {
            paddingTop: el?.layout[activeBreakpoint]?.padding?.top,
            paddingRight: el?.layout[activeBreakpoint]?.padding?.right,
            paddingBottom: el?.layout[activeBreakpoint]?.padding?.bottom,
            paddingLeft: el?.layout[activeBreakpoint]?.padding?.left,
          }),

          ...(el?.layout[activeBreakpoint]?.margin && {
            marginTop: el?.layout[activeBreakpoint]?.margin?.top,
            marginRight: el?.layout[activeBreakpoint]?.margin?.right,
            marginBottom: el?.layout[activeBreakpoint]?.margin?.bottom,
            marginLeft: el?.layout[activeBreakpoint]?.margin?.left,
          }),

          rotate: el?.position[activeBreakpoint].rotation + "deg",

          borderRadius: `${el?.position[activeBreakpoint].borderRaduis?.topLeft} ${el?.position[activeBreakpoint].borderRaduis?.topRight} ${el?.position[activeBreakpoint].borderRaduis?.bottomLeft} ${el?.position[activeBreakpoint].borderRaduis?.bottomRight}`,
          background: `${el?.fill
            ?.reverse()
            ?.map((fill) => {
              if (fill.type === "color") {
                return `#${fill.value.r
                  ?.toString(16)
                  ?.padStart(2, "0")}${fill.value.g
                  ?.toString(16)
                  ?.padStart(2, "0")}${fill.value.b
                  ?.toString(16)
                  ?.padStart(2, "0")}${Math.round(fill.value.a * 255)
                  ?.toString(16)
                  ?.padStart(2, "0")}`;
              } else if (fill.type === "image") {
                return `url(${fill.value}) center / cover no-repeat`;
              }
              return "";
            })
            .join(" , ")}`,

          position: el?.position[activeBreakpoint]?.type,
          top: el?.position[activeBreakpoint]?.specs?.top,
          left: el?.position[activeBreakpoint]?.specs?.left,
          right: el?.position[activeBreakpoint]?.specs?.right,
          bottom: el?.position[activeBreakpoint]?.specs?.bottom,
          display: el?.isDeleted && "none",

          zIndex: el?.position[activeBreakpoint]?.zIndex,
        }}
        className={`

            flex

            text-black

            ${
              el?.layout[activeBreakpoint]?.direction == "column"
                ? "flex-col"
                : "flex-row"
            } 
            
            ${
              elements?.some((ele) => ele?._id == el?._id) &&
              "border-2 border-primary"
            }
              

             ${el?.layout[activeBreakpoint]?.alignItems}
             ${el?.layout[activeBreakpoint]?.justifyContent}

            `}
      >
        {/* {JSON.stringify(elements)} */}
        {/* <h1 className="text-4xl font-bold text-white">{el?.type}</h1> */}
        {el?.children &&
          el?.children?.length > 0 &&
          el?.children?.map((ele, index) => {
            if (ele?.type == "div") {
              return <DivBuilder el={ele} key={index} />;
            } else if (ele?.type == "text") {
              return <TextBuilder el={ele} key={index} />;
            }
            //   else if (ele?.type == "button") {
            //     return <ButtonBuilder el={ele} />;
            //   }
          })}
      </div>
    
  );
};

export const TextBuilder = ({ el, isJustText, textColor }) => {
  const { elements, handleSelect, activeBreakpoint, handleUpdate } =
    useContext(StoreContext);

  let isArabic = false;

  //   const { handleUpdate, handleMultiSelect, elements } = useContext(
  //     ComponentBuilderContext
  //   );

  const [isEditMode, setIsEditMode] = useState(false);

  return isJustText ? (
    !isEditMode ? (
      <p
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleSelect(el);
        }}
        className={`${
          el?.content.font[activeBreakpoint].decoration["bold"]
            ? "font-bold"
            : "font-normal"
        } ${
          el?.content.font[activeBreakpoint].decoration["italic"]
            ? "italic"
            : ""
        } ${
          el?.content.font[activeBreakpoint].decoration["underline"]
            ? "underline"
            : ""
        } ${
          el?.content.font[activeBreakpoint].decoration["lineThrough"]
            ? "line-through"
            : ""
        }

          ${el?.content.font[activeBreakpoint].decoration["textAlignment"]}
          `}
        onDoubleClick={() => {
          setIsEditMode(!isEditMode);
        }}
        style={{
          fontSize: el?.content.font[activeBreakpoint].fontSize,
          fontFamily: el?.content?.font[activeBreakpoint].family,
          color:
            textColor &&
            `rgba(${textColor?.r} , ${textColor?.g} , ${textColor?.b} , ${textColor?.a})`,
        }}
      >
        {isArabic ? el?.content?.text?.ar : el?.content?.text?.en}
      </p>
    ) : (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsEditMode(!isEditMode);
        }}
      >
        <input
          style={{
            width: "100%",

            backgroundColor: "transparent",
            color: textColor && textColor,
            fontSize: el?.content.font[activeBreakpoint].fontSize,
            fontFamily: el?.content?.font[activeBreakpoint].family,
          }}
          value={isArabic ? el?.content?.text?.ar : el?.content?.text?.en}
          autoFocus={true}
          className={`${
            el?.content.font[activeBreakpoint].decoration["bold"]
              ? "font-bold"
              : "font-light"
          } ${
            el?.content.font[activeBreakpoint].decoration["italic"]
              ? "italic"
              : ""
          } ${
            el?.content.font[activeBreakpoint].decoration["underline"]
              ? "underline"
              : ""
          } ${
            el?.content.font[activeBreakpoint].decoration["lineThrough"]
              ? "line-through"
              : ""
          }

          ${el?.content.font[activeBreakpoint].decoration["textAlignment"]}

          `}
          onChange={(e) => {
            if (isArabic) {
              el.content.text.ar = e.target.value;
            } else {
              el.content.text.en = e.target.value;
            }

            handleUpdate();
          }}
        />
      </form>
    )
  ) : (
    <div
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();

        handleSelect(el);
      }}
      //   ${el?.visable ? "" : "hidden"}
      //   ${el?.isDeleted && "hidden"}
      className={`

       ${
         elements?.some((selectedEle) => selectedEle?._id === el._id) &&
         "border-2 border-primary"
       }

      `}
      style={{
        color: `rgba(${el?.fill[0].value.r}, ${el?.fill[0].value.g}, ${el?.fill[0].value.b}, ${el?.fill[0].value.a})`,

        // width: el?.dimensions.width[activeBreakpoint].includes("auto")
        //   ? "fit-content"
        //   : el?.dimensions.width[activeBreakpoint],
        // height: el?.dimensions.height[activeBreakpoint].includes("auto")
        //   ? "fit-content"
        //   : el?.dimensions.height[activeBreakpoint],
        ...(el?.layout[activeBreakpoint]?.padding && {
          paddingTop: el?.layout[activeBreakpoint]?.padding?.top,
          paddingRight: el?.layout[activeBreakpoint]?.padding?.right,
          paddingBottom: el?.layout[activeBreakpoint]?.padding?.bottom,
          paddingLeft: el?.layout[activeBreakpoint]?.padding?.left,
        }),

        ...(el?.layout[activeBreakpoint]?.margin && {
          marginTop: el?.layout[activeBreakpoint]?.margin?.top,
          marginRight: el?.layout[activeBreakpoint]?.margin?.right,
          marginBottom: el?.layout[activeBreakpoint]?.margin?.bottom,
          marginLeft: el?.layout[activeBreakpoint]?.margin?.left,
        }),

        rotate: el.position[activeBreakpoint].rotation + "deg",

        borderRadius: `${el.position[activeBreakpoint].borderRaduis?.topLeft} ${el.position[activeBreakpoint].borderRaduis?.topRight} ${el.position[activeBreakpoint].borderRaduis?.bottomLeft} ${el.position[activeBreakpoint].borderRaduis?.bottomRight}`,

        position: el?.position[activeBreakpoint]?.type,
        top: el?.position[activeBreakpoint]?.specs?.top,
        left: el?.position[activeBreakpoint]?.specs?.left,
        right: el?.position[activeBreakpoint]?.specs?.right,
        bottom: el?.position[activeBreakpoint]?.specs?.bottom,

        fontSize: el?.content.font[activeBreakpoint].fontSize,
        fontFamily: el?.content?.font[activeBreakpoint].family,

        zIndex: el?.zIndex,

        display: el?.isDeleted && "none",
      }}
    >
      {!isEditMode ? (
        <p
          className={`${
            el?.content.font[activeBreakpoint].decoration["bold"]
              ? "font-bold"
              : ""
          } ${
            el?.content.font[activeBreakpoint].decoration["italic"]
              ? "italic"
              : ""
          } ${
            el?.content.font[activeBreakpoint].decoration["underline"]
              ? "underline"
              : ""
          } ${
            el?.content.font[activeBreakpoint].decoration["lineThrough"]
              ? "line-through"
              : ""
          }

          ${el?.content.font[activeBreakpoint].decoration["textAlignment"]}
          `}
          onDoubleClick={() => {
            setIsEditMode(!isEditMode);
          }}
          style={{
            width: "100%",
            height: "100%",
            fontSize: el?.content.font[activeBreakpoint].fontSize,
            fontFamily: el?.content?.font[activeBreakpoint].family,
          }}
        >
          {isArabic ? el?.content?.text?.ar : el?.content?.text?.en}
        </p>
      ) : (
        <form
          style={{
            width: "100%",
            height: "100%",
          }}
          onSubmit={(event) => {
            event.preventDefault();
            setIsEditMode(!isEditMode);
          }}
        >
          <input
            autoFocus={true}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              fontSize: el?.content.font[activeBreakpoint].fontSize,
              fontFamily: el?.content?.font[activeBreakpoint].family,
            }}
            value={isArabic ? el?.content?.text?.ar : el?.content?.text?.en}
            className={`${
              el?.content.font[activeBreakpoint].decoration["bold"]
                ? "font-bold"
                : ""
            } ${
              el?.content.font[activeBreakpoint].decoration["italic"]
                ? "italic"
                : ""
            } ${
              el?.content.font[activeBreakpoint].decoration["underline"]
                ? "underline"
                : ""
            } ${
              el?.content.font[activeBreakpoint].decoration["lineThrough"]
                ? "line-through"
                : ""
            }

          ${el?.content.font[activeBreakpoint].decoration["textAlignment"]}
          `}
            onChange={(e) => {
              if (isArabic) {
                el.content.text.ar = e.target.value;
              } else {
                el.content.text.en = e.target.value;
              }

              handleUpdate();
            }}
          />
        </form>
      )}
    </div>
  );
};

export const ButtonBuilder = ({ el }) => {
  const { elements, handleSelect, activeBreakpoint } = useContext(StoreContext);

  let element = elements[0];

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        // setElement(el);

        handleSelect(el);
      }}
      className={`btn ${!el?.style?.isCustom && `${el?.style?.style}`}
         ${el?.visable ? "" : "hidden"}
      ${el?.isDeleted && "hidden"}

      ${element?._id != el?._id && "hover:border-[1px] hover:border-primary/80"}

       ${
         elements?.some((selectedEle) => selectedEle?._id === el._id) &&
         "border-2 border-primary"
       }

              `}
      style={{
        ...(el?.style?.isCustom && {
          marginTop: el?.layout[activeBreakpoint]?.margin?.top,
          marginRight: el?.layout[activeBreakpoint]?.margin?.right,
          marginBottom: el?.layout[activeBreakpoint]?.margin?.bottom,
          marginLeft: el?.layout[activeBreakpoint]?.margin?.left,

          paddingTop: el?.layout[activeBreakpoint]?.padding?.top,
          paddingRight: el?.layout[activeBreakpoint]?.padding?.right,
          paddingBottom: el?.layout[activeBreakpoint]?.padding?.bottom,
          paddingLeft: el?.layout[activeBreakpoint]?.padding?.left,

          borderRadius: `${el?.position[activeBreakpoint].borderRaduis?.topLeft} ${el?.position[activeBreakpoint].borderRaduis?.topRight} ${el?.position[activeBreakpoint].borderRaduis?.bottomLeft} ${el?.position[activeBreakpoint].borderRaduis?.bottomRight}`,
          backgroundColor: `rgba(${el?.style?.customStyle?.backgroundColor?.value?.r} , ${el?.style?.customStyle?.backgroundColor?.value?.g} , ${el?.style?.customStyle?.backgroundColor?.value?.b} , ${el?.style?.customStyle?.backgroundColor?.value?.a})`,
        }),
      }}
    >
      <TextBuilder
        el={el}
        isJustText={true}
        textColor={el?.style?.customStyle?.textColor?.value}
      />
    </button>
  );
};
