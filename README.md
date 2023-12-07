# My personal, technical, weblog.
## Built completely with CI/CD across dev, stage & prod environments.

#### I have attempted to make this project as modular as possible, such that one could deploy their own site/blog from it.

#### This project is hosted in it's different environments as follows:

[Blog - Production](https://blog.obimadu.pro) <br>
[Blog - Staging](https://blog-stage.obimadu.pro)

#### To be clear, what am really selling is the dev, stage, and prod workflow, along with the Github Actions scripts (the workflow implementation). Deploying blogs with Hugo isn't, although i like it very much.
#### This project is basically just an implementation of Github Environments. Although I have used my Hugo blog, you could take just the actions scripts and modify them to suit. You would in that case have to do quite a bit of modifications, though, because they were intended for a Hugo blog use-case from the beginning.


## Deploying a ready site/blog from this project
### 1. Clone the project
### 2. Create the appropriate folders (or submodules)

#### Choose a Hugo Theme

This project uses the Hugo LoveIt theme. LoveIt is a beautiful, comprehensive blogging theme. If you decide to go ahead with it, there're a few ways to do so: <br>

<b>1. Create a git submodule of the main LoveIt repository </b>at the /themes/loveit directory. You do not need to edit the hugo.toml file to point to this since this project has that done already. The downfall of this method's that you won't be able to make changes to the theme files (unless of course you fancy contributing to the Loveit project).

<b>2. Download the Loveit repository and store it </b>at the /themes/loveit directory. This allow you edit the theme files as you desire. The downfall of this method is that theme LoveIt is considerably heavy, it would as a result make your first push to Github take a while. Second you would miss out on any new updates to the theme. You could always of course download the whole bunch again (and go through that bulky re-upload again).

<b>3. Fork the LoveIt project, and create a git submodule pointing to your fork </b>at the /themes/loveit directory. This is the recommended approach, and the one this project currently uses. This would allow you make any desired update to the theme files, while still being able to receive updates from the upstream LoveIt repo.

##### If you eventually decide to use any other Hugo theme, setting it up for your use would follow exactly the same steps as described for theme LoveIt above. You would in that case, need to update the hugo.toml file to point to whatever you have set your theme direcory name to.

#### Create a 'content' directory
Depending on your theme of choice your site/blog Markdown content would typically go in the content directory. Theme LoveIt follows the content/page.md structure for pages and content/posts/post.md for posts.

For this project I decided to make my content/posts directory a git submodule (to promote modularism, and to enable me make it private).

You should pay attention to the content structure of whatever other Hugo theme you decide to use, and arrange your contents accordingly.

### 3. Review the Actions Workflows
You should review the steps in the different deployment environments of the Actions workflows, to understand it and maybe alter it as suits your use. To summarize, the workflow for this project goes as illustrated below.

<!-- Project workflow diagram(s) here -->

### 4. Create the additional, required repos

To deploy to Github Pages using the actions workflow from this project, you would need to setup 2 additional repositories for hosting the static output from Hugo.

For my use i created a <b>blog-production</b> & a <b>blog-staging</b> repository (both of which i made private).

You would need to setup approriate access to these repositories too, to enable the workflow deploy to them.

### 5. Setup the required environment secrets and variables
The below list contains all the different environment secrets and variables. The list of secrets and variables in the staging environment is, of course, a direct duplicate of all in the production environment, but with diffent, apporiate values.

<!-- List of secrets and vars attached here -->


## Additional Info & FAQs
### Why's the Hugo Build command a variable?
This allows for custom build commands for each of the different environments. For insance in the staging environmen for this project I build my blog with draft posts, via the Hugo '-D' option. This allows me to view draft posts from my staging environment but not the production environment.

### Why manually update the 'posts' submodule reference?
Adding a new commit for every important update (such as a ready new post) on the posts submodule triggers the github-pages action to re-deploy the blog. This is a hosting-on-github-pages constraint type of situation. The pages action wont re-deploy the blog if the commit points to that of the last deploy. As a result if we just checked-out the posts sub-directory at the CD script, there won't be any new commit, and the changes don't get deployed.