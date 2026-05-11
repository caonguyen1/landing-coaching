import React from 'react';

type PanelProps = {
  title?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Panel({
  title,
  right,
  children,
  footer,
}: PanelProps) {
  return (
    <div className="bg-white rounded-xl shadow mb-4">

      {/* HEADER */}
      {(title || right) && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300 bg-gradient-to-b from-primary-300 to-primary-500 text-white rounded-t-xl">
          <div className="font-bold text-md md:text-lg">
            {title}
          </div>

          <div>{right}</div>
        </div>
      )}

      {/* BODY */}
      <div className="p-5">
        {children}
      </div>

      {/* FOOTER */}
      {footer && (
        <div className="px-5 py-3 border-t border-gray-300 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}