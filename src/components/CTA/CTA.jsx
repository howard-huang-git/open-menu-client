import "./CTA.scss";

function CTA({ text, className, type, handler }) {
  return (
    <>
        <button className={"CTA " + className} type={type} onClick={handler}  >{text}</button>
    </>
  );
}

export default CTA;