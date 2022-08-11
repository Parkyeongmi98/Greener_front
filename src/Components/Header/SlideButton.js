

export default function SlideButton({ direction, onClick }) {
    return (
        <button onClick={onClick} className={`btn-slide-control btn-${direction}`}>
            <i class="fa-solid fa-circle-chevron-right"></i>
        </button>
    );
}

