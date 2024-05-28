import { motion } from "framer-motion";
import { getBackgroundColorProps } from "../../../getBackgroundColorProps";

export default function TextBuilder({ el, activeBreakpoint }) {
  return (
    <motion.h1
      style={{
        fontSize: el?.content?.font[activeBreakpoint]?.fontSize,
        fontWeight: el?.content?.font[activeBreakpoint]?.weight,
        fontFamily: el?.content?.font[activeBreakpoint]?.family,
        ...getBackgroundColorProps(el, el?.fill[0]),
      }}
      className={`${
        el?.content?.font[activeBreakpoint]?.decoration?.textAlignment
      } w-full ${
        el?.content?.font[activeBreakpoint]?.decoration?.lineThrough &&
        "line-through"
      } ${
        el?.content?.font[activeBreakpoint]?.decoration?.underline &&
        "underline"
      } ${el?.content?.font[activeBreakpoint]?.decoration?.italic && "italic"}`}
    >
      {el?.content?.text?.en}
    </motion.h1>
  );
}
