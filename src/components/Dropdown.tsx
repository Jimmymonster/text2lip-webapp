function Dropdown({
    name,
    value,
    dropdownList,
    handleInput,
  }: {
    name: string;
    value: string;
    dropdownList: string[];
    handleInput: (value: any) => void;
  }) {
    return (
      <div className="w-full">
        <select
          id={name}
          name={name}
          onChange={handleInput}
          value={value}
          //className="cursor-pointer w-full h-10 p-4 text-sm text-gray-900 border border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-100"
          className="text-[color:var(--text-color-1)]  cursor-pointer bg-[color:var(--bg-box-col)] hover:bg-[color:var(--bg-box-hover-col)] border-slate-400 text-sm font-semibold rounded-xl block w-full p-2 "
        >
          {dropdownList.map((option, index) => (
            <option value={option} key={index} className="text-[color:var(--text-color-1)] ">
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  export default Dropdown;