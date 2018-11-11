// helper functions and variable for DataPage
// clears our input fields
export const clearFields = { currentText: '' }

export function checkDataType(isVocab){ return isVocab ? 'vocabulary' : 'expressions'; }

export function getProgress(){
  const { vocabulary, expressions, chapter, title } = this.state;
  const multiplier = this.props.isAPI ? 25 : 50
  const v = vocabulary.length / 9 * multiplier;
  const e = expressions.length / 6 * multiplier;
  return this.props.isAPI
    ? (v >= 25 ? 25 : v) + (e >= 25 ? 25 : e) + (chapter ? 25 : 0) + (title ? 25 : 0)
    : (v >= 50 ? 50 : v) + (e >= 50 ? 50 : e);
}

export function checkDataArrays(){
  const percent = this.getProgress();
  const isDataReady = percent === 100;
  if(isDataReady === this.state.isDataReady && percent === this.state.progress) return;
  this.setState({ isDataReady, percent });
}

export function handleSubmit(e){
  e.preventDefault();
  const { currentText, isVocab } = this.state;
  const newEntry = { text: currentText || '' };
  const dataType = this.checkDataType(isVocab);
  this.setState({
    ...clearFields,
    [dataType]: [newEntry, ...this.state[dataType]],
    dataChanged: true,
  });
}

export function handleChange(e){
  e.preventDefault();
  const name = `current${e.target.name}`;
  const value = e.target.value;
  this.setState({[name]:value});
}

export function handleEdit(e){
  const targetedId = Number(e.target.id);
  const dataType = this.checkDataType(this.state.isVocab);
  // returns the target obj and an updated array without that obj
  const splitData = this.state[dataType].reduce((acc, cVal, i)=>{
    targetedId === i
      ? acc.target = cVal
      : acc.rest.push(cVal);
    return acc;
  },{ target: {}, rest:[] });
  const { text } = splitData.target;
  this.setState({
    [dataType]: splitData.rest,
    currentText: text,
    dataChanged: true,
  });
}

export function handleDelete(e){
  const dataType = this.checkDataType(this.state.isVocab);
  const updatedData = this.state[dataType].filter((x, i) => Number(e.target.id) !== i);
  this.setState({ [dataType]: updatedData, dataChanged: true,});
}

// handles opening and closing the accordion
export function handleClick(e, { index }){
  const newIndex = this.state.activeIndex === index ? -1 : index
  this.setState({ 
    ...clearFields,
    activeIndex: newIndex, 
    isVocab: newIndex < 1,
  })
}

export function handleChapter(e){
  const name = e.target.name;
  const value = Number(e.target.value);
  this.setState({[name]:value});
}

export function handleTitle(e){
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]:value});
}

export function handlePost(data){
  fetch(this.props.postRoute, {
    method: "POST",
    body: JSON.stringify(data), 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response=> response.json())
  .then(() => this.props.changeScreen({screen:2}))
  .catch(err=> console.error(err))
}