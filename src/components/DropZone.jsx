export default function DropZone({ children, onDragOver, onDrop, category }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
      className='dropZone'
    >
      {children}
    </div>
  );
}
