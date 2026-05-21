"use client";

import { useCarModal } from "@/context/providers/carFilterProvider";
import { useEffect, useRef } from "react";

export default function AutoModal({ children }) {
  const backdropRef = useRef(null);
  const { state, dispatch } = useCarModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_VISIBLE", payload: true });
      requestAnimationFrame(() => {
        requestAnimationFrame(() =>
          dispatch({ type: "SET_ANIMATING", payload: true }),
        );
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    dispatch({ type: "SET_ANIMATING", payload: false });
    setTimeout(() => dispatch({ type: "SET_VISIBLE", payload: false }), 350);
  };
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) closeModal();
  };

  if (!state.visible) return null;

  return (
    <>
      <style>{`
        .auto-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 8, 20, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1055;
          opacity: 0;
          transition: opacity 0.35s ease;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .auto-modal-backdrop.show {
          opacity: 1;
          overflow: auto;
        }

        .auto-modal-dialog {
          width: 100%;
          max-width: 90vw;
          max-height: 95vh;
          margin: 1rem;
          transform: scale(0.72) translateY(24px);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.34, 1.36, 0.64, 1), opacity 0.35s ease;
        }
        .auto-modal-backdrop.show .auto-modal-dialog {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        .auto-modal-content {
          font-family: 'DM Sans', sans-serif;
          border: none;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow:
            0 32px 80px rgba(10, 8, 30, 0.28),
            0 8px 24px rgba(10, 8, 30, 0.14),
            inset 0 0 0 1px rgba(255,255,255,0.9);
        }

        .auto-modal-header {
          position: relative;
          padding: 0;
          border: none;
          overflow: hidden;
        }
        .modal-header-bg {
          padding: 2.5rem 2rem 2rem;
          position: relative;
        }
        .modal-header-bg::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
        }
        .modal-header-bg::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 20px;
          width: 160px; height: 160px;
          border-radius: 50%;
        }

        .modal-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(200, 160, 255, 0.85);
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        .modal-title-text {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          line-height: 1.28;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .modal-title-text span {
          color: #c084fc;
        }

        .btn-close-custom {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.8);
          transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
          z-index: 10;
          flex-shrink: 0;
        }
        .btn-close-custom:hover {
          background: rgba(255,255,255,0.2);
          color: #fff;
          transform: scale(1.08) rotate(90deg);
        }
        .btn-close-custom svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 2.2;
          stroke-linecap: round;
        }

        .auto-modal-body {
          padding: 1.75rem 2rem;
        }
        .modal-body-text {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          color: #4a4560;
          margin: 0 0 1.25rem;
        }

        .modal-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .modal-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #3d3555;
          font-weight: 400;
        }
        .feature-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #a855f7;
          flex-shrink: 0;
        }

        .auto-modal-footer {
          padding: 0 2rem 1.75rem;
          display: flex;
          gap: 10px;
          border: none;
        }
        .btn-modal-primary {
          flex: 1;
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.35);
        }
        .btn-modal-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
        }
        .btn-modal-secondary {
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          border: 1.5px solid #e2ddf0;
          border-radius: 12px;
          cursor: pointer;
          background: transparent;
          color: #7c6fa0;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .btn-modal-secondary:hover {
          background: #f5f2ff;
          color: #4a3880;
        }
      `}</style>

      <div
        ref={backdropRef}
        className={`auto-modal-backdrop${state.animating ? " show" : ""}`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="autoModalTitle"
      >
        <div className="auto-modal-dialog">
          <div className="auto-modal-content">
            {/* Header */}
            <div className="auto-modal-header">
              <div className="modal-header-bg modal-content">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
