import "./Filters.css"

export default function NumberFilter({ text, id, onChange, value }) {
    return <div className="number-filter">
            <div className="span">{text}</div>
            <input type="text" name={id} id="" onChange={onChange} value={Math.floor(value)}/>
        </div>
}