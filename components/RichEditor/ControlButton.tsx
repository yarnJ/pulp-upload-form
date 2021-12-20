import { MouseEvent, useCallback } from "react";
import classNames from "classnames";

export function ControlButton(props: ControlButtonProps) {
  const onToggle = (event: MouseEvent) => {
    event.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <span
      className={classNames("mr-3 cursor-pointer text-tiny", {
        "text-gray-600": !props.active,
        "text-blue-600": props.active,
      })}
      onMouseDown={onToggle}
    >
      {props.label}
    </span>
  );
}

export interface ControlButtonProps {
  onToggle: (style: string) => void;
  style: string;
  active: boolean;
  label: string;
}
