interface iProps {
  onClick: (e: any) => void;
}
export default function StartButton({ onClick }: iProps) {
  return (
    <button className="start-btn" onClick={onClick}>
      <img src="/start.png"></img>
    </button>
  );
}
