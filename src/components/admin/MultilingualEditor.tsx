'use client';

import { useState } from 'react';
import { Multilingual } from '@/lib/database';

interface MultilingualEditorProps {
  field: string;
  value: Multilingual;
  onChange: (field: string, value: Multilingual) => void;
  useTextarea?: boolean;
  rows?: number;
  placeholder?: Multilingual;
}

export default function MultilingualEditor({
  field,
  value,
  onChange,
  useTextarea = false,
  rows = 4,
  placeholder = { fr: '', ar: '' }
}: MultilingualEditorProps) {
  const [activeTab, setActiveTab] = useState<'fr' | 'ar'>('fr');
  
  const handleInputChange = (lang: 'fr' | 'ar', newValue: string) => {
    const updatedValue = { ...value, [lang]: newValue };
    onChange(field, updatedValue);
  };
  
  return (
    <div className="w-full">
      <div className="flex border-b mb-2">
        <button
          type="button"
          className={`px-4 py-2 ${
            activeTab === 'fr'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('fr')}
        >
          Français
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            activeTab === 'ar'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('ar')}
        >
          العربية
        </button>
      </div>
      
      <div className="mt-2">
        {activeTab === 'fr' && (
          useTextarea ? (
            <textarea
              value={value.fr}
              onChange={(e) => handleInputChange('fr', e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              rows={rows}
              placeholder={placeholder.fr}
            />
          ) : (
            <input
              type="text"
              value={value.fr}
              onChange={(e) => handleInputChange('fr', e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder={placeholder.fr}
            />
          )
        )}
        
        {activeTab === 'ar' && (
          <div dir="rtl">
            {useTextarea ? (
              <textarea
                value={value.ar}
                onChange={(e) => handleInputChange('ar', e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                rows={rows}
                placeholder={placeholder.ar}
              />
            ) : (
              <input
                type="text"
                value={value.ar}
                onChange={(e) => handleInputChange('ar', e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder={placeholder.ar}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
} 