'use client';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

export function IconSelector({ onIconSelect }: any) {
  const [icons, setIcons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  useEffect(() => {
    if (isOpen) {
      import('@fortawesome/free-brands-svg-icons')
        .then((iconsModule) => {
          setIcons(Object.values(iconsModule) as any);
        })
        .catch((error) => {
          console.error('Error loading icons', error);
        });
    }
  }, [isOpen]);

  const handleIconSelect = (icon: any) => {
    setIsOpen(false);
    onIconSelect(icon);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Select Icon</button>
      {isOpen && (
        <ComboBoxResponsive
          options={icons.map((icon: Icon) => ({
            label: `${icon?.iconName?.[0].toUpperCase?.()}${icon?.iconName?.substring?.(
              1
            )}`,
            value: icon.iconName,
            icon: (
              <div className='mr-2'>
                <FontAwesomeIcon icon={icon} />
              </div>
            ),
          }))}
          selectedOption={selected}
          setSelectedOption={setSelected}
        />
      )}
    </div>
  );
}
