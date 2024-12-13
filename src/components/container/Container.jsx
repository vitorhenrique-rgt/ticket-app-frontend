const Container = ({ children }) => {
  return (
    <div className="m-auto mt-6 flex max-w-3xl flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
};

export default Container;
