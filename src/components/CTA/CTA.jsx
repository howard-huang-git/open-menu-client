import "./CTA.scss";

function CTA({ text, className }) {
  return (
    <>
        <button className={"CTA " + className}>{text}</button>
    </>
  );
}

export default CTA;