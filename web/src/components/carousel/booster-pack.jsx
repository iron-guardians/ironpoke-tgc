function BoosterPack({ data, onClick }) {
    return (
        <div className="booster-pack" onClick={onClick}>
            {data && data.image && (
                <img src={data.image} alt={`${data.name} Overlay`} className="booster-pack-overlay" />
            )}
        </div>
    );
}

export default BoosterPack;