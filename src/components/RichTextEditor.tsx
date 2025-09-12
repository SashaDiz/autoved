'use client';

import { useRef, useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Введите текст...", 
  className = "" 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Функция для выполнения команд форматирования
  const execCommand = (command: string, value?: string): boolean => {
    if (editorRef.current) {
      editorRef.current.focus();
      const success = document.execCommand(command, false, value);
      if (!success) {
        console.warn(`Command ${command} failed`);
      }
      return success;
    }
    return false;
  };

  // Обработка изменений в редакторе
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Обработка вставки ссылки
  const handleLink = () => {
    const url = prompt('Введите URL ссылки:');
    if (url && url.trim()) {
      // Проверяем, есть ли выделенный текст
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      
      if (selectedText) {
        // Если есть выделенный текст, создаем ссылку
        const success = execCommand('createLink', url);
        if (!success) {
          // Альтернативный метод - заменяем выделенный текст на ссылку
          const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
          execCommand('insertHTML', linkHtml);
        }
      } else {
        // Если нет выделенного текста, вставляем URL как ссылку
        const linkText = prompt('Введите текст ссылки:', url);
        if (linkText) {
          const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
          execCommand('insertHTML', linkHtml);
        }
      }
    }
  };

  // Обработка списков
  const handleUnorderedList = () => {
    const success = execCommand('insertUnorderedList');
    if (!success) {
      // Альтернативный метод - вставляем HTML напрямую
      const listHtml = '<ul><li>Элемент списка</li></ul>';
      execCommand('insertHTML', listHtml);
    }
  };

  const handleOrderedList = () => {
    const success = execCommand('insertOrderedList');
    if (!success) {
      // Альтернативный метод - вставляем HTML напрямую
      const listHtml = '<ol><li>Элемент списка</li></ol>';
      execCommand('insertHTML', listHtml);
    }
  };

  // Обработка нажатий клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+B для жирного текста
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      execCommand('bold');
    }
    // Ctrl+I для курсива
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      execCommand('italic');
    }
    // Ctrl+K для ссылки
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      handleLink();
    }
  };

  // Инициализация содержимого при первом рендере
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Обновление содержимого при изменении value (только если редактор не в фокусе)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value && !isFocused) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isFocused]);

  return (
    <div className={`rich-text-editor border border-gray-300 rounded-lg ${className}`}>
      {/* Панель инструментов */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="px-2 py-1 text-sm font-bold border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Жирный текст (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="px-2 py-1 text-sm italic border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Курсив (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="px-2 py-1 text-sm underline border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Подчеркнутый"
        >
          U
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={handleUnorderedList}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Маркированный список"
        >
          • Список
        </button>
        <button
          type="button"
          onClick={handleOrderedList}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Нумерованный список"
        >
          1. Список
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={handleLink}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Добавить ссылку (Ctrl+K)"
        >
          🔗 Ссылка
        </button>
        <button
          type="button"
          onClick={() => execCommand('removeFormat')}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Убрать форматирование"
        >
          Очистить
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => {
            const testHtml = '<p><strong>Тест</strong> <em>форматирования</em> <u>текста</u></p><ul><li>Элемент списка 1</li><li>Элемент списка 2</li></ul><p><a href="https://example.com">Пример ссылки</a></p>';
            execCommand('insertHTML', testHtml);
          }}
          className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
          title="Вставить тестовый контент"
        >
          Тест
        </button>
      </div>

      {/* Редактор */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`min-h-[120px] p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-transparent ${
          isFocused ? 'ring-2 ring-gray-900' : ''
        }`}
        style={{ minHeight: '120px' }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Стили для placeholder */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable]:focus:before {
          content: none;
        }
      `}</style>
    </div>
  );
}
