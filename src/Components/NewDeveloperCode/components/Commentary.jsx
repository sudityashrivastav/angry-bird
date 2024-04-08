const Commentary = ({comm}) => {  

  return (
    <div className="w-screen fixed top-2 mb-36 flex place-items-center">
      {comm && (
        <p className="fixshadow text-2xl shadow-md rounded-sm px-2 mx-auto inline font-extrabold ">
          {comm}
        </p>
      )}
    </div>
  );
};

export default Commentary;
