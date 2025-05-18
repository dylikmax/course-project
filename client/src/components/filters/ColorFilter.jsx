import "./Filters.css"

export default function CheckboxFilter({ value }) {
    return <div className="checkbox-filter">
        <input type="checkbox" name="" id="" />
        <div className="span">{value}</div>
    </div>
}