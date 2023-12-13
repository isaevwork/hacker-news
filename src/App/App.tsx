import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ArticlesList from '../pages/ArticlesListPage/ArticlesList'
import CommentPage from '../pages/CommentPage/CommentPage'
import './styles/styles.css'

function App (): JSX.Element {
  return (
      <BrowserRouter>
          <div className="app">
              <Routes>
                  <Route path='/' element={<ArticlesList />} />
                  <Route path='comments/:id' element={<CommentPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App