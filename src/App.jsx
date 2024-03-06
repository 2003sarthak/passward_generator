import "./App.css";
import { useState, useCallback , useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passward, setPassward] = useState("");
  //useRef
  const passwardRef=useRef(null)
  //useCallback hook
  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassward(pass);
  }, [length, numberAllowed, charAllowed, setPassward]);
  //copy fun
  const copyPassToClipboard=useCallback(()=>{
    passwardRef.current?.select()
    passwardRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(passward)
  },[passward])
  //useEffoct hook
  useEffect(()=>{
    passwardGenerator();
  },[length,numberAllowed,charAllowed,passwardGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-sm rounded-lg px-4 my-10 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center pt-4">Passward Generator</h1>
        <div className="flex rounded-lg overflow-hidden ">
          <input
            type="text"
            value={passward}
            className="outline-none w-full py-1 px-3 my-4 rounded-s"
            placeholder="Passward"
            readOnly
            ref={passwardRef}
          />
          <button onClick={copyPassToClipboard} className="outline-none bg-blue-700 text-white w-10 h-8 mt-4 shrink-0 rounded-e">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 pb-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
