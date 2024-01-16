import Wheel from "./components/Wheel.jsx";
import {useEffect, useState} from "react";
import generateColors from "./library/color.js";
import copy from 'copy-to-clipboard';

const App = () => {

    const defaultTitle = 'Колесо балансу';
    const defaultNameTitle = 'Ім\'я';

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

    const [date, setDate] = useState(actual?.date ? new Date(actual?.date) : null);
    const [isPreview, setIsPreview] = useState(true);
    const [isValueWhite, setIsValueWhite] = useState(true);
    const [title, setTitle] = useState(actual?.title ?? defaultTitle);
    const [nameTitle, setNameTitle] = useState(actual?.nameTitle ?? defaultNameTitle);
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
            date: new Date(),
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

    let className = '';
    if (!isUserReady && !isUserResult) {
        className = 'bg-red-100';
    } else if (isUserResult) {
        className = 'bg-green-100';
    }

    const activeButtonClassName = 'bg-blue-500 hover:bg-blue-700 text-white'
    const inactiveButtonClassName = 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700'

    return <div className={`select-none flex flex-col w-full h-full align-middle justify-center items-center ${className}`}>

        {/*{!isUserResult && !isUserReady && <div className="text-3xl text-slate-600 font-bold absolute top-0">Налаштування:</div>}*/}
        {isUserResult && <div className="text-xl text-slate-600 font-bold absolute top-0 left-0 m-3">Результати: {date.toLocaleDateString('uk-UA')} {date.toLocaleTimeString('uk-UA')}</div>}

        {isUserReady && !isUserResult &&
            <button
                className="absolute top-0 left-0 m-3 z-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                onClick={copyResults}>
                <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                          d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"/>
                </svg>
                <span className="ml-2">Скопіювати результат у буфер обміну</span>
            </button>
        }

        {!isUserReady && !isUserResult && <div className="absolute top-0 right-0 m-3 z-10  flex flex-col">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                onClick={copyLink}>
                <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                          d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"/>
                </svg>
                <span className="ml-2">Скопіювати посилання в буфер обміну</span>
            </button>
            <button
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                onClick={openLink}>
                <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                          d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
                <span className="ml-2">Робоча вкладка</span>
            </button>
        </div>}

        {!isUserResult && <div className="absolute top-0 left-0 z-10">

            {!isUserReady && <button type="button" onClick={() => setIsPreview(!isPreview)}
                                     className={`font-bold py-2 px-4 rounded m-3 ${isPreview ? inactiveButtonClassName : activeButtonClassName} inline-flex items-center justify-center`}
            >
                <svg className={`w-[18px] h-[18px] ${isPreview ? 'text-gray-700' : 'text-white'}`} aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                </svg>
                <span className="ml-2">Редагування</span>
            </button>}

            {/*{!isUserReady && <div className="flex items-center">*/}
            {/*    <span*/}
            {/*        className={`text-sm font-medium ${!isPreview ? 'text-gray-900' : 'text-gray-400'}`}>Редагування</span>*/}
            {/*    <label className="relative inline-flex items-center cursor-pointer mx-3">*/}
            {/*        <input type="checkbox" checked={isPreview} onChange={() => setIsPreview(!isPreview)}*/}
            {/*               className="sr-only peer"/>*/}
            {/*        <div*/}
            {/*            className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>*/}
            {/*    </label>*/}
            {/*    <span className={`text-sm font-medium ${isPreview ? 'text-gray-900' : 'text-gray-400'}`}>Перегляд</span>*/}
            {/*</div>}*/}

            {!isUserReady && !isPreview && <div className="flex p-4 border ml-3 rounded-lg bg-white">
                <div className="column1">
                    <div className="mb-3">
                        <div>Назва:</div>
                        <textarea rows="2" value={title}
                                  onChange={e => setTitle(e.target.value)}
                                  className="block w-full rounded-lg border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <div className="flex items-center">
                            <div className="mr-3">Відображати ім'я:</div>
                            <input type="checkbox" checked={showNameField}
                                   onChange={() => setShowNameField(!showNameField)}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div>Розмір колеса:</div>
                        <input type="range" min={200} max={800} step={10} value={size}
                               onChange={e => setSize(Number(e.target.value))}/>
                    </div>
                    <div className="mb-3">
                        <div>Відступ від рамки поля:</div>
                        <input type="range" min={0} max={200} step={1} value={padding}
                               onChange={e => setPadding(Number(e.target.value))}/>
                    </div>
                    <div className="mb-3">
                        <div>Відступ назв від колеса:</div>
                        <input type="range" min={0} max={200} step={1} value={margin}
                               onChange={e => setMargin(Number(e.target.value))}/>
                    </div>
                    <div className="mb-0">
                        <div>Розмір шкали сектора:</div>
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
                        <div>Сектори</div>
                        <div>(кількість дорівнює кількості назв)</div>
                        <textarea rows="13"
                                  value={labelsText}
                                  onChange={e => {
                                      setLabelsText(e.target.value);
                                  }}
                                  className="block w-full rounded-lg border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        ></textarea>
                    </div>
                </div>
            </div>}
        </div>}
        <div className="flex justify-center">
            <div className={`flex flex-col items-center relative`}>
                <div className="text-3xl mb-3 text-slate-600 font-bold text-center">
                    {title.split('\n').map(titleRow=>{
                        return <div key={titleRow}>{titleRow}</div>;
                    })}
                </div>
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
            <div className="w-100 flex flex-col justify-center ml-5 max-w-48 ">
                {showNameField && <div className="flex flex-col text-1xl mb-3 text-slate-600 font-bold">
                    <div>{nameTitle}:</div>
                    {isUserResult && <div className="rounded-md bg-white my-2 p-1.5 border">
                        {name.split('\n').map(textRow => <div key={textRow} className="break-words">{textRow}</div>)}
                    </div>}
                    {!isUserResult && <textarea
                        rows={3}
                        className="rounded-md my-2 p-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
                        value={name}
                        disabled={isUserResult}
                        onChange={e => {
                            if (isUserReady) {
                                setName(e.target.value);
                            }
                        }}
                    ></textarea>}
                </div>}
                {labels.map((label, inputIndex) => {
                    return <div key={`label_input_${inputIndex}`}
                                className="flex flex-row items-center relative mb-2 rounded-md bg-white border">
                        <div className="w-12 h-full rounded-l-md flex items-center justify-center" style={{backgroundColor: colors[inputIndex]}}>
                            <div className="color-circle font-bold">{values[inputIndex]}</div>
                        </div>

                        <div className="block w-full py-1.5 pl-2 text-gray-900 break-words">{labels[inputIndex]}</div>
                    </div>;
                })}
            </div>
        </div>
    </div>;
}

export default App;
