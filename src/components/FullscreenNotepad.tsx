import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

interface iProps {
  setProgramName: (n: string | undefined) => void;
  setMinimized: (l: string | undefined) => void;
  endpoint: string;
}

export default function FullscreenNotepad({
  setProgramName,
  setMinimized,
  endpoint,
}: iProps) {
  const navigate = useNavigate();

  const [content, setContent] = useState<string>(`
    
       ▓▓    ▓▓  ▓▓▓▓▓▓▓▓       ▓▓▓▓▓  ▓▓
      ▓▓▓   ▓▓  ▓▓▒▒▒▒▒▒      ▓▓▒▒▓▓  ▓▓
       ▓▓▒▓  ▓▓  ▓▓▓▓▓▓▓▓     ▓▓▓▓▓▓▓  ▓▓
      ▓▓░▒▓ ▓▓  ▓▓▒▒▒▒▒▒    ▓▓▒▒▒▒▓▓  ▓▓
       ▓▓ ░▒▓▓▓  ▓▓░░░░░░   ▓▓▒░░░░▓▓  ▓▓
      ▓▓  ░▒▓▓  ▓▓▓▓▓▓▓▓  ▓▓▒░    ▓▓  ▓▓▓▓▓▓▓▓
       ▒▒   ░▒▒  ▒▒▒▒▒▒▒▒  ▒▒░     ▒▒  ▒▒▒▒▒▒▒▒
      ░░    ░░  ░░░░░░░░  ░░      ░░  ░░░░░░░░


      Hello and welcome to my portfolio!


About me:

My love for programming began in 2014 when I wrote my first ActionScript program in Adobe Flash, it wasn't much, just a simple bullet-hell style game, but it ignited a fire within me.  I quickly moved on from 2D games to 3D; learning Blender, Unity, and C#. I was a one-man-circus, planning, modeling, rigging, texturing, scripting, and even composing music. Something about writing a story and seeing it come to life has always been so mesmerizing to me. After awhile, I rediscovered my childhood love for LEGO and this lead me to start building web-scraping programs using Node.js to keep track of LEGO prices and stock. This made me realize that programming was something I could do for a living and so I attended Codeup, a 6-month full-stack JavaScript and Java/Spring bootcamp. That's where I am today, eager to start my first job in a field that I love where I can make ideas turn into reality!

Beyond the IDE:

Other than coding, I'm a huge LEGO fan (if you couldn't already tell!) I have an awesome collection of Star Wars, Minecraft, and (my favorite) non-production LEGO bricks that were only used by LEGO designers/employees to construct models for LEGOLAND themeparks and other events. This facisnation lead me to the creation of my largest and most comprehensive project, qelement. While it is still a work in progress, I plan to have it deployed by mid-to-late 2024. I am also the proud owner of an e-commerce LEGO part store hosted on bricklink.com! My other hobbies include cooking, 3D modelling, animation, graphic design, CAD/CAM with CNC machines, reading, music composition,

Credits:

|   Styles:
|---------------------------------------------------------------------------------------------------------------------------
|   |   98.css (https://jdan.github.io/98.css/#table-view)
|   |   [Windows 98 style CSS package]
|   |
|   |   I actually only used this package for the window title bars and buttons, the rest of the site is made from scratch
|---------------------------------------------------------------------------------------------------------------------------
|   |   98.js (https://98.js.org/)
|   |   [Online Windows 98 simulator]
|   |
|   |    Mainly used for reference/inspiration and finding proper fonts
|---------------------------------------------------------------------------------------------------------------------------
|   |    Windows 98 Icon Viewer (https://win98icons.alexmeub.com/)
|   |    [Icon collection]
|   |
|   |    Main source of icons, although some are made by me
|---------------------------------------------------------------------------------------------------------------------------
|   |    FixedSys (https://github.com/kika/fixedsys)
|   |    [Retro font]
|   |
|   |    You're looking at it now!


Portfolio:

|   This portfolio was built in React + Vite (Typescript)
|---------------------------------------------------------------------------------------------------------------------------
|   Repository:
|   
|   |   https://github.com/ToastBubbles/portfolio-mkii
`);
  useEffect(() => {
    setProgramName("About.txt - Notepad");
  }, [setProgramName]);

  useEffect(() => {
    setMinimized(endpoint);
  }, [setMinimized]);
  return (
    <div className="window fullscreen">
      <div
        className="title-bar interact-none"
        style={{ cursor: "default", justifyContent: "start" }}
      >
        <img
          src="/notepad-small.png"
          style={{ marginRight: "5px" }}
          className="pe-none"
        ></img>
        <div className="title-bar-text fg-1 pe-none">About.txt - Notepad</div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onClick={() => {
              navigate("/");
            }}
          />
          <button aria-label="Maximize" />
          <button
            aria-label="Close"
            onClick={() => {
              setProgramName(undefined);
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="window-body fg-1">
        <div className="window-body-container">
          <div className="window-body-inner-border">
            <textarea
              className="notepad-area"
              spellCheck="false"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
