import "./Filters.css"

export default function CheckboxFilter({ value, onCheck, checked }) {
    return <div className="checkbox-filter">
        <input type="checkbox" name={value} id="" onChange={onCheck} checked={checked} />
        <div className="span">{value}</div>
    </div>
}