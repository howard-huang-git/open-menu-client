import "./CTA.scss";

function CTA({ text, className }) {
  return (
    <>
        <button className={"CTA " + className} type="submit" >{text}</button>
    </>
  );
}

export default CTA;