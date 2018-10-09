// helper functions and variable for DataPage
// clears our input fields
export const clearFields = {
  currentText: '',
  currentTranslation: '',
  currentImage: '',
}

export function checkDataType(isVocab){ return isVocab ? 'vocabulary' : 'expressions'; }

export function checkDataReadiness() {
  const { vocabulary, expressions, chapter, title, postRoute } = this.state;
  return postRoute
    ? vocabulary.length >= 9 && expressions.length >= 6 && chapter && title
    : vocabulary.length >= 9 && expressions.length >= 6;
}

export function checkDataArrays(){
  const isDataReady = this.checkDataReadiness();
  if(isDataReady === this.state.isDataReady) return;
  this.setState({ isDataReady });
}

export function handleSubmit(e){
  e.preventDefault();
  const { currentText, currentTranslation, currentImage, isVocab } = this.state;
  const newEntry = { 
    text: currentText || '',
    translation: currentTranslation || '',
    imageURL: currentImage || '',
  };
  const dataType = this.checkDataType(isVocab);
  this.setState({
    ...clearFields,
    [dataType]: [...this.state[dataType], newEntry],
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
  const {text, translation, image} = splitData.target;
  this.setState({
    [dataType]: splitData.rest,
    currentText: text,
    currentTranslation: translation,
    currentImage: image,
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

export function handlePostRequest(data){
  fetch(this.state.postRoute, {
    method: "POST",
    body: JSON.stringify(data), 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response=> response.json())
  .then(() => this.props.handleMessage())
  .catch(err=> console.error(err))
}