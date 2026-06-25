import styles from './CartDrawer.module.css'

export default function CartDrawer({
  isOpen,
  items,
  subtotal,
  shipping,
  total,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  orderPlaced,
}) {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`} aria-label="Shopping cart">
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>Close</button>
        </div>

        {orderPlaced && (
          <p className={styles.notice}>Order placed successfully. Thank you for shopping with LoamSkin.</p>
        )}

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Your cart is empty.</p>
              <span>Add a blend to begin checkout.</span>
            </div>
          ) : (
            items.map((item) => (
              <article key={item.id} className={styles.item}>
                <div>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemTagline}>{item.tagline}</p>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>
                <div className={styles.itemControls}>
                  <div className={styles.quantity}>
                    <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Decrease ${item.name}`}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onIncrement(item.id)} aria-label={`Increase ${item.name}`}>
                      +
                    </button>
                  </div>
                  <button type="button" className={styles.remove} onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className={styles.checkoutBtn}
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}
