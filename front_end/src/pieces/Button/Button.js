import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button_type, Button_variant } from "../../constants/Theme_config.js";

const Button = ({
  size,
  type,
  children,
  leftIcon,
  rightIcon,
  onlyIcon,
  clickEvent,
  disabled,
  ...props
}) => {
  const variant = onlyIcon
    ? "OnlyIcon"
    : leftIcon
    ? rightIcon
      ? "BothIcon"
      : "LeftIcon"
    : rightIcon
    ? "RightIcon"
    : "Default";
  const classNames = `${Button_type[type]} ${
    Button_variant[`${size}${variant}`]
  }`;
  return (
    <button
      className={`${classNames} flex items-center justify-center ${props.className}`}
      onClick={clickEvent}
      disabled={disabled}
    >
      {onlyIcon ? (
        <FontAwesomeIcon icon={onlyIcon} />
      ) : (
        <div className='flex items-center justify-center'>
          {leftIcon && (
            <FontAwesomeIcon
              icon={leftIcon}
              className={size === "small" ? "pr-1" : "pr-2"}
            />
          )}
          {children && (
            <span className={size === "small" ? "text-[14px]" : "text-[16px]"}>
              {children}
            </span>
          )}
          {rightIcon && (
            <FontAwesomeIcon
              icon={rightIcon}
              className={size === "small" ? "pl-1" : "pl-2"}
            />
          )}
        </div>
      )}
    </button>
  );
};

Button.defaultProps = {
  size: "medium",
  type: "primary",
  variant: "default",
};

export default Button;
