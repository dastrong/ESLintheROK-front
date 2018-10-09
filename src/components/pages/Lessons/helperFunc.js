// helpers for Lessons Page

export function handleLoader(index, urlAddOns, dataSource){
  this.setState({ showMessage: false, showLoader: true, index }, this.handleFetch(urlAddOns, dataSource));
}

export function handleFetch(urlAddOns, dataSource){
  fetch(this.state.baseURL+urlAddOns)
  .then((blob)=>blob.json())
  .then((json)=>{
    this.setState({
      showLoader: false,
      [dataSource]: json,
    })
  });
}

export function changeIndex(e){
  if(!e.target.id) return;
  this.setState({ index: Number(e.target.id) });
}

export function handleGradeClick(e){
  const id = e.currentTarget.id;
  this.handleLoader(1, id, 'books')
}

export function handleBookClick(e){
  const id = `/${this.state.books._id}${e.currentTarget.id}`;
  this.handleLoader(2, id, 'lessons')
}

export function handleLessonClick(e){
  const { books, lessons } = this.state;
  const id = `/${books._id}/${lessons._id}${e.currentTarget.id}`;
  this.handleLoader(3, id, 'data')
}

// helpers for API part of Lessons Page
export function handleLessonAPIClick(e){
  const { books, lessons } = this.state;
  const apiRoute = `/${books._id}/${lessons._id}`;
  this.setState({ index: 3, apiRoute })
}

export function handlePost(cb){
  this.setState({ showLoader: true }, cb)
}

export function handleMessage(){
  this.setState({ showMessage: true, showLoader: false, index: 0 })
}