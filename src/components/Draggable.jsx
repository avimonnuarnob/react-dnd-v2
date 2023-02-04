export default function Draggable({
  onDragStart,
  id,
  content,
  parentCategory,
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, parentCategory)}
      id={id}
      className='draggable'
    >
      <span>{content}</span>
    </div>
  );
}
