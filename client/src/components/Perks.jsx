import React from "react";

const Perks = ({ selected, onChange }) => {
   const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected].filter((selectedName) => selectedName !== name));
    }
  };

  return (
    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("jednosobni")}
          name="jednosobni"
          onChange={handleCbClick}
        />

        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 15H1V11H14V15H15V4H14V7H1V0H0V15Z" fill="black"/> <path d="M6 6H2V5H6V6Z" fill="black"/> </svg>

        <span>1 soba</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("visesobni")}
          name="visesobni"
          onChange={handleCbClick}
        />
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 15H1V11H14V15H15V4H14V7H1V0H0V15Z" fill="black"/> <path d="M6 6H2V5H6V6Z" fill="black"/> </svg>

        <span>2 ili više soba</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("db")}
          name="db"
          onChange={handleCbClick}
        />
        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M448,242.025V152a48.055,48.055,0,0,0-48-48H112a48.055,48.055,0,0,0-48,48v90.025A64.115,64.115,0,0,0,16,304V416a32.036,32.036,0,0,0,32,32H64v48H96V448H416v48h32V448h16a32.036,32.036,0,0,0,32-32V304A64.115,64.115,0,0,0,448,242.025ZM112,416H48V304a32,32,0,0,1,64,0Zm256,0H144V320H368Zm2.025-128H141.975A64.243,64.243,0,0,0,96,242.025V152a16.019,16.019,0,0,1,16-16H400a16.019,16.019,0,0,1,16,16v90.025A64.243,64.243,0,0,0,370.025,288ZM464,416H400V304a32,32,0,0,1,64,0l.02,112Z" class="ci-primary"/> </svg>

        <span>Dnevni boravak</span>
      </label>
      
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("plaza")} name="plaza" onChange={handleCbClick} />

        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M259.431,268.8l140-140-27.785-27.785A208.333,208.333,0,0,0,77.019,395.646L104.8,423.431l132-132L401.372,456h45.256ZM224.333,72a175.182,175.182,0,0,1,124.686,51.646l5.157,5.158-57.058,57.058a477.658,477.658,0,0,0-62.879-53.924C209.023,114.1,184.8,101.609,162.245,94.807a152.909,152.909,0,0,0-17.092-4.129A175.58,175.58,0,0,1,224.333,72ZM104.8,378.176l-5.158-5.157A176.637,176.637,0,0,1,66.678,169.153a153.129,153.129,0,0,0,4.129,17.092c6.8,22.556,19.3,46.778,37.131,71.994a477.658,477.658,0,0,0,53.924,62.879Zm79.7-79.7c-11.857-11.634-32.231-32.977-50.438-58.718-22.872-32.336-46.59-77.9-33.753-115.45,37.421-12.793,82.8,10.736,115.005,33.437,25.864,18.233,47.431,38.815,59.158,50.759Z" class="ci-primary"/> </svg>
        <span>Blizina plaže</span>

      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("ljubimci")} name="ljubimci" onChange={handleCbClick} />

        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M393.3,161.33,334.532,76.438a48.09,48.09,0,0,0-38.775-20.673l-111.527-1.6-.23,0c-57.579,0-101.757,9.631-130.21,56.634C27.3,154.551,16,229.08,16,360v16H52.557L29.024,496h32.61L85.167,376H96a99.521,99.521,0,0,0,70.088-27.992c16.979-16.246,29.226-38.472,35.419-64.274l.056-.232L229.006,152h-32.69L170.337,276.488C162.425,309.168,138.766,344,96,344H48.06c.869-113.266,11.182-180.419,33.105-216.634,18.4-30.4,45.295-41.191,102.724-41.206l111.408,1.6a16.026,16.026,0,0,1,12.925,6.891L374.7,190.67,464,205.554v16.959l-14.892,79.421c-4.395,23.441-11.908,35.249-42.718,38.95L280.084,362.493,279.249,496h32l.667-106.493,98.7-16.9c22.36-2.749,38.857-9.955,50.426-22.023,9.89-10.318,15.909-23.5,19.519-42.752L496,225.487V178.446Z" class="ci-primary"/> </svg>

        <span>Ljubimci</span>

      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("pristup")} name="pristup" onChange={handleCbClick} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <span>Pristup smještaju automobilom</span>
      </label>
    </div>
  );
};

export default Perks;
