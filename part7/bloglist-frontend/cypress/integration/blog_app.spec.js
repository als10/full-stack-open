describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Super User', username: 'root', password: 'password'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Super User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('this is the title')
      cy.get('#author').type('mr author')
      cy.get('#url').type('www.blog.com')
      cy.get('#create-blog-btn').click()

      cy.contains('this is the title')
      cy.contains('mr author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'this is the title',
          author: 'mr author',
          url: 'www.blog.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('this is the title').parent().as('blog')
        cy.get('@blog').find('button').click()
        cy.get('@blog').contains('likes 0')

        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 1')
      })

      it('the user who created it can delete it', function () {
        cy.contains('this is the title').parent().as('blog')
        cy.get('@blog').find('button').click()
        cy.get('@blog').contains('remove').click()
        cy.should('not.contain', 'this is the title')
      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'this is the title 1',
          author: 'mr author 1',
          url: 'www.blog.com',
          likes: 0
        })

        cy.createBlog({
          title: 'this is the title 2',
          author: 'mr author 2',
          url: 'www.blog.com',
          likes: 6
        })

        cy.createBlog({
          title: 'this is the title 3',
          author: 'mr author 3',
          url: 'www.blog.com',
          likes: 12
        })
      })

      it.only('they are ordered according to likes', function() {
        const blogTitlesInOrderOfLikes = [
          'this is the title 3',
          'this is the title 2',
          'this is the title 1'
        ]
        cy.get('.blogs-list>div').then(($blogs) => {
          $blogs.map((i, $blog) => cy.wrap($blog).contains(blogTitlesInOrderOfLikes[i]))
        })
      })
    })
  })
})