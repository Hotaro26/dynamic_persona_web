import { motion, AnimatePresence } from 'framer-motion';
import confirmSticker from '../assets/confirm-sticker.png';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ isOpen, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'auto'
            }}
            onClick={onCancel}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="border-box confirm-modal"
            style={{
              position: 'relative',
              width: '400px',
              maxWidth: '85%',
              background: 'var(--bg-primary)',
              padding: '32px',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              border: '1px solid var(--border-strong)',
              zIndex: 2
            }}
          >
            {/* Character popping out from the left side */}
            <motion.img
              className="confirm-img"
              src={confirmSticker}
              alt="Confirm Character"
              initial={{ x: -40, opacity: 0, y: '-50%' }}
              animate={{ x: -100, opacity: 1, y: '-50%' }}
              exit={{ x: -40, opacity: 0, y: '-50%' }}
              transition={{ type: 'spring', delay: 0.2, damping: 15 }}
              style={{
                position: 'absolute',
                left: '0px',
                top: '50%',
                width: '130px',
                zIndex: -1,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3)) grayscale(100%)'
              }}
            />
            
            <div className="mono" style={{ color: 'var(--accent)', fontSize: '12px' }}>
              [ SYSTEM_CONFIRMATION ]
            </div>
            
            <h3 style={{ fontSize: '1.2rem', lineHeight: 1.5, margin: 0, color: 'var(--text-primary)' }}>
              Are you sure you want to disable the interactive guide characters?
            </h3>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button 
                onClick={onCancel}
                className="mono cursor-target"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                CANCEL
              </button>
              <button 
                onClick={onConfirm}
                className="mono cursor-target"
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  color: 'var(--bg-primary)',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  transition: 'transform 0.1s ease'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                DISABLE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
