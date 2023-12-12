import ArticlesList from './pages/ArticlesList/ArticlesList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Comments from './pages/Comments/Comments'

function App (): JSX.Element {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<ArticlesList />} />
              <Route path='comments/:id' element={<Comments />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App