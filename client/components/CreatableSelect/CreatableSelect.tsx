import { GroupBase, Props } from 'react-select'
import CreatableSelect from 'react-select/creatable'

// type SelectProps<
//   Option,
//   IsMulti extends boolean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>
// > = Props<Option, IsMulti, Group> & {}

function CustomCreatableSelect<
  Option,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <>
      <div></div>
      <CreatableSelect
        components={{
          DropdownIndicator: null,
        }}
        id="creatable-select"
        {...props}
      />
    </>
  )
}

export default CustomCreatableSelect
