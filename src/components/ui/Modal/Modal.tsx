import styles from './Modal.module.css';
import { createPortal } from "react-dom";

export function Modal({ children, onClose }) {
    return createPortal(
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.modalClose}
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    ×
                </button>

                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}
