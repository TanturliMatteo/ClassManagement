import { useDeleteImpact } from "../../hooks/useDeleteImpact";
import type { DeleteEntity } from "../../services/deleteImpactServices";

interface ConfirmDeleteModalProps {
  entity: DeleteEntity;
  id: string;
  title: string;
  itemName: string | null;
  isDeleting: boolean;
  error: Error | null;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Conferma di eliminazione condivisa da tutti i form.
 * Prima di abilitare "Delete" verifica i dati collegati: mostra le conseguenze
 * oppure blocca l'eliminazione quando cancellerebbe dati storici.
 */
const ConfirmDeleteModal = ({
  entity,
  id,
  title,
  itemName,
  isDeleting,
  error,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const {
    data: impact,
    isLoading,
    error: impactError,
  } = useDeleteImpact(entity, id);

  const isBlocked = !!impact?.blockedReason;
  const isReady = !isLoading && !impactError && !!impact;
  const canDelete = isReady && !isBlocked && !isDeleting;

  return (
    <div className="modal-overlay">
      <div className="modal-box confirm-box">
        <div className="confirm-header">
          <span className="confirm-icon" aria-hidden="true">
            {isBlocked ? "⚠️" : "🗑️"}
          </span>
          <h3 className="confirm-title">{title}</h3>
          {itemName && <p className="confirm-item">{itemName}</p>}
        </div>

        <div className="confirm-body">
          {isLoading && (
            <p className="confirm-muted">Verifica dei dati collegati…</p>
          )}

          {impactError && (
            <p className="confirm-error">
              Impossibile verificare i dati collegati: {impactError.message}
            </p>
          )}

          {isReady && isBlocked && (
            <p className="confirm-blocked">{impact.blockedReason}</p>
          )}

          {isReady && !isBlocked && (
            <>
              <ul className="confirm-list">
                {impact.consequences.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <p className="confirm-muted">
                L'operazione è definitiva e non può essere annullata.
              </p>
            </>
          )}

          {error && (
            <p className="confirm-error">
              Eliminazione non riuscita: {error.message}
            </p>
          )}
        </div>

        <div className="row confirm-actions">
          <button type="button" onClick={onCancel} className="cancel-btn min">
            {isBlocked ? "Close" : "Cancel"}
          </button>
          {!isBlocked && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={!canDelete}
              className="delete-btn min"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
