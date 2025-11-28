/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from 'react-select';
const CustomSelectWhite = (props: any) => {
  return (
    <>
      <Select
        closeMenuOnSelect={props.closeMenuOnSelect}
        hideSelectedOptions={props.hideSelectedOptions}
        defaultValue={props.defaultValue}
        options={props.options}
        isSearchable={props.isSearchable}
        getOptionLabel={props.getOptionLabel}
        isClearable={props.isClearable}
        isLoading={props.loading}
        menuPlacement={props.menuPlacement || "auto"}
        menuPortalTarget={props.menuPortalTarget || (props.useMenuPortal ? document.body : undefined)}
        styles={{

          placeholder: (base) => ({
            ...base,
            color: "#5e6278",
            fontSize: props.controlFontSize ? props.controlFontSize : "16px",
            fontWeight: "400",
          }),
          singleValue: (base) => ({
            ...base,
            color: props.fontColor ? props.fontColor : "#5e6278",
            fontSize: props.controlFontSize ? props.controlFontSize : "16px",
            fontWeight: "400",
          }),
          option: (base) => ({
            ...base,
            border: props.border ? props.border : "0.1px solid #f9f9f9",
            margin: "0px",
            background: "white",
            padding: "1rem 1.25rem",
            ":active": {
              ...base[":active"],
              color: "#43799d",
              background: "#f1faff",
            },
            ":hover": {
              ...base[":active"],
              color: "#43799d",
              background: "#f1faff",
            },
            color: "#006736",
            fontSize: "16px",
            fontWeight: "700",
          }),
          control: (base) => ({
            ...base,
            // border: `1px solid #DBDFE9`,
            border: props.border
              ? "0.5px solid " + props.border
              : "1px solid #DBDFE9",
            color: "#006736",
            background: props.bgColor ? props.bgColor : "#fff",
            boxShadow: "none",
            minHeight: props.minHeight ? props.minHeight : "60px",
            borderRadius: props.borderRadius ? props.borderRadius : "6.1px",
            padding: "6.5px 10px 6.5px 6px",
            fontSize: props.controlFontSize ? props.controlFontSize : "16px",
            fontWeight: "700",
            ":hover": {
              ...base[":active"],
              border: "0.1px solid #DBDFE9",
            },
          }),
          multiValue: (base) => {
            return {
              ...base,
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "100",
              borderRadius: "100px",
              backgroundColor: "#006736",
              color: "#fff",
              padding: "8px 8px 8px 10px",
            };
          },
          multiValueLabel: (base) => ({
            ...base,
            color: "#006736",
          }),
          menu: (base) => ({
            ...base,
            zIndex: props.menuZIndex || 9999,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: props.menuZIndex || 9999,
          }),
          menuList: (base) => ({
            ...base,
            paddingTop: "0px",
            paddingBottom: "0px",
            maxHeight: "200px",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            background: "#f9f9f9",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            color: "#006736",
            strokeWidth: "5px",
          }),
          multiValueRemove: (base, { data }) => ({
            ...base,
            fontSize: "16px",
            fontWeight: "600",
            svg: {
              width: "20px",
              height: "20px",
              color: "#006736 ",
            },
            ":hover": {
              backgroundColor: "#e7f1fd",
            },
          }),
        }}
        components={{
          // DropdownIndicator,
        }}
        isDisabled={props.isDisabled ? props.isDisabled : false}
        onChange={props.onChange}
        // menuIsOpen={true}
        onMenuScrollToBottom={props.onMenuScrollToBottom}
        isMulti={props.isMulti}
        value={props.value}
        placeholder={props.placeholder}
      />
    </>
  );
};
export { CustomSelectWhite };
