import './DeleteProductModal.css';

export default function DeleteProductModal({ show, onClose, handleDelete, deleteProductData}) {

   const onDelete = ()=>{
    handleDelete(deleteProductData.id);
    
   }
  return (
    <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {(deleteProductData) && (
            <p>Are you sure you want to delete the product {deleteProductData.title}?</p>)
            }
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
            Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
