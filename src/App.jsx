import Wheel from "./components/Wheel.jsx";
import {useEffect, useState} from "react";
import generateColors from "./library/color.js";
import copy from 'copy-to-clipboard';

const App = () => {

    const defaultLabels = [
        'Відносини',
        'Фінанси',
        'Здоров\'я',
        'Дозвілля',
        'Друзі',
        'Навчання',
        'Відпочинок',
        'Фізична активність',
    ];

    let url = new URL(window.location.href);
    const _urlData = url.searchParams.get('data');
    let actual = null;
    if (_urlData) {
        actual = JSON.parse(decodeURIComponent(atob(_urlData)));
    }

    const isUserResult = actual?.isUserResult ?? false;
    const isUserReady = actual?.isUserReady ?? false;
    const alpha = 1;
    const saturation = 100;
    const lightness = 60;
    const alphaHovered = 0.5;
    const saturationHovered = 100;
    const lightnessHovered = 60;

    const [isPreview, setIsPreview] = useState(true);
    const [isValueWhite, setIsValueWhite] = useState(true);
    const [title, setTitle] = useState(actual?.title ?? 'Колесо балансу');
    const [nameTitle, setNameTitle] = useState(actual?.nameTitle ?? 'Ім\'я');
    const [name, setName] = useState(actual?.name ?? '');
    const [showNameField, setShowNameField] = useState(actual?.showNameField ?? true);
    const [size, setSize] = useState(actual?.size ?? 600);
    const [padding, setPadding] = useState(actual?.padding ?? 50);
    const [margin, setMargin] = useState(actual?.margin ?? 60);
    const [levelsCount, setLevelsCount] = useState(actual?.levelsCount ?? 10);
    const [values, setValues] = useState(actual?.values ?? []);
    const [colors, setColors] = useState([]);
    const [hoveredColors, setHoveredColors] = useState([]);
    const [labelsText, setLabelsText] = useState(defaultLabels.join('\n'));
    const [labels, setLabels] = useState(actual?.labels ?? []);

    const getDataForUrl = () => {
        return {
            isUserResult: false,
            isUserReady: false,
            title: title,
            nameTitle: nameTitle,
            showNameField: showNameField,
            size: size,
            padding: padding,
            margin: margin,
            levelsCount: levelsCount,
            labels: labels,
            values: values,
            name: name,
        };
    };

    const generateUserResultUrlData = () => {
        const data = getDataForUrl();
        data.isUserReady = true;
        data.isUserResult = true;
        return generateUrlData(data);
    }
    const generateUserReadyUrlData = () => {
        const data = getDataForUrl();
        data.isUserReady = true;
        return generateUrlData(data);
    }
    const generateUrlData = (data) => {
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        let url = new URL(window.location.href);
        url.searchParams.set('data', encoded);
        return url;
    }
    const copyResults = () => {
        const url = generateUserResultUrlData();
        copy(url);
        alert('Посилання скопійоване. Надішліть його викладачеві.')
    }
    const copyLink = () => {
        const url = generateUserReadyUrlData();
        copy(url);
        alert('Посилання скопійоване.')
    }
    const openLink = () => {
        const url = generateUserReadyUrlData();
        window.open(url, '_blank').focus();
    };

    useEffect(() => {
        setColors(generateColors(labels.length, alpha, saturation, lightness));
        setHoveredColors(generateColors(labels.length, alphaHovered, saturationHovered, lightnessHovered));
    }, [labels, alpha, saturation, lightness, alphaHovered, saturationHovered, lightnessHovered]);

    useEffect(() => {
        if (!isUserReady && !isUserResult) {
            setValues(Array(labels.length).fill(levelsCount));
        }
    }, [labels, levelsCount]);

    useEffect(() => {
        if (!isUserReady && !isUserResult) {
            setLabels(labelsText.split('\n'));
        }
    }, [labelsText]);

    return <div className="flex flex-col w-full h-full align-middle justify-center items-center">
        {isUserReady && !isUserResult &&
            <button className="absolute top-0 right-0 m-3 z-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={copyResults}>скопіювати результат у буфер обміну
            </button>
        }

        {!isUserReady && !isUserResult && <div className="absolute top-0 right-0 m-3 z-10  flex flex-col">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={copyLink}>скопіювати публічне посилання в буфер обміну
            </button>
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={openLink}>відкрити публічне посилання
            </button>
        </div>}

        {!isUserResult && <div className="absolute top-0 left-0 p-4 border m-3 rounded-md bg-white z-10">

            {!isUserReady && <div className="flex items-center">

                <div className="flex items-center">
                    <span
                        className={`text-sm font-medium ${!isPreview ? 'text-gray-900' : 'text-gray-400'}`}>Edit</span>
                    <label className="relative inline-flex items-center cursor-pointer mx-3">
                        <input type="checkbox" checked={isPreview} onChange={() => setIsPreview(!isPreview)}
                               className="sr-only peer"/>
                        <div
                            className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <span
                        className={`text-sm font-medium ${isPreview ? 'text-gray-900' : 'text-gray-400'}`}>Preview</span>
                </div>
            </div>}

            {!isUserReady && !isPreview && <div className="flex mt-4">
                <div className="column1">
                    <div className="mb-3">
                        <div>Wheel Title:</div>
                        <input type="text" value={title}
                               className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                               onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <div className="flex items-center">
                            <div className="mr-3">Show Name Field:</div>
                            <input type="checkbox" checked={showNameField}
                                   onChange={() => setShowNameField(!showNameField)}/>
                        </div>
                    </div>
                    {showNameField && <div className="mb-3">
                        <div>Name Field Title:</div>
                        <input type="text" value={nameTitle}
                               className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                               onChange={e => setNameTitle(e.target.value)}/>
                    </div>}

                    <div className="mb-3">
                        <div className="flex items-center">
                            <div className="mr-3">White values:</div>
                            <input type="checkbox" checked={isValueWhite}
                                   onChange={() => setIsValueWhite(!isValueWhite)}/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div>Size: {size}</div>
                        <input type="range" min={100} max={800} step={10} value={size}
                               onChange={e => setSize(Number(e.target.value))}/>
                    </div>
                    <div className="mb-3">
                        <div>Padding: {padding}</div>
                        <input type="range" min={0} max={200} step={1} value={padding}
                               onChange={e => setPadding(Number(e.target.value))}/>
                    </div>
                    <div className="mb-3">
                        <div>Margin: {margin}</div>
                        <input type="range" min={0} max={200} step={1} value={margin}
                               onChange={e => setMargin(Number(e.target.value))}/>
                    </div>
                    <div className="mb-3">
                        <div>Levels: {levelsCount}</div>
                        <input type="range" min={2} max={20} step={1} value={levelsCount}
                               onChange={e => setLevelsCount(Number(e.target.value))}/>
                    </div>

                    {/*<div>alpha: {alpha}</div>*/}
                    {/*<input type="range" min={0} max={1} step={0.05} value={alpha}*/}
                    {/*       onChange={e => setAlpha(Number(e.target.value))}/>*/}

                    {/*<div>saturation: {saturation}</div>*/}
                    {/*<input type="range" min={0} max={100} step={1} value={saturation}*/}
                    {/*       onChange={e => setSaturation(Number(e.target.value))}/>*/}

                    {/*<div>lightness: {lightness}</div>*/}
                    {/*<input type="range" min={0} max={100} step={1} value={lightness}*/}
                    {/*       onChange={e => setLightness(Number(e.target.value))}/>*/}

                    {/*<hr className="my-5"/>*/}

                    {/*<div>alphaHovered: {alphaHovered}</div>*/}
                    {/*<input type="range" min={0} max={1} step={0.05} value={alphaHovered}*/}
                    {/*       onChange={e => setAlphaHovered(Number(e.target.value))}/>*/}

                    {/*<div>saturationHovered: {saturationHovered}</div>*/}
                    {/*<input type="range" min={0} max={100} step={1} value={saturationHovered}*/}
                    {/*       onChange={e => setSaturationHovered(Number(e.target.value))}/>*/}

                    {/*<div>lightnessHovered: {lightnessHovered}</div>*/}
                    {/*<input type="range" min={0} max={100} step={1} value={lightnessHovered}*/}
                    {/*       onChange={e => setLightnessHovered(Number(e.target.value))}/>*/}
                </div>
                <div className="column2 ml-4">
                    <div>
                        <div>Labels:</div>
                        <textarea cols="30" rows="10"
                                  value={labelsText}
                                  onChange={e => {
                                      setLabelsText(e.target.value);
                                  }}
                                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        ></textarea>
                    </div>
                </div>
            </div>}

        </div>}
        <div className="flex justify-center">
                <div className={`flex flex-col items-center relative`}>
                    <div className="text-3xl mb-3 text-slate-600 font-bold text-center">{title}</div>
                    <Wheel padding={padding}
                           margin={margin}
                           size={size}
                           levelsCount={levelsCount}
                           colors={colors}
                           valueColor={isValueWhite ? '#fff' : '#000'}
                           hoveredColors={hoveredColors}
                           values={values}
                           labels={labels}
                           readonly={!isUserReady || isUserResult}
                           onChangeValues={newValues => {
                               if (isUserReady) {
                                   setValues(newValues);
                               }
                           }}
                    />
                </div>
                <div className="w-100 flex flex-col justify-center ml-5">
                    {showNameField && <div className="flex flex-col text-1xl mb-3 text-slate-600 font-bold">
                        <div>{nameTitle}:</div>
                        <input value={name}
                               disabled={isUserResult}
                               onChange={e => {
                                    if (isUserReady) {
                                        setName(e.target.value);
                                    }
                                }}
                               className="rounded-md my-2 border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
                    </div>}
                    {labels.map((label, inputIndex) => {
                        return <div key={`label_input_${inputIndex}`}
                                    className="flex flex-row items-center relative mb-2">
                            <div className="color-circle font-bold"
                                 style={{backgroundColor: colors[inputIndex]}}>{values[inputIndex]}</div>
                            <input
                                disabled={true}
                                className="block w-full py-1.5 pl-10 text-gray-900 "
                                type="text" value={labels[inputIndex]} id={`label_${inputIndex}`}
                                name={`label_${inputIndex}`}
                            />
                        </div>;
                    })}
                </div>

            </div>
    </div>;
}

export default App;
