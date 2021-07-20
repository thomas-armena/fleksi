# Fleksi

## Inspiration

- Inspired by AEM
  - AEM is commonly used in enterprise over other CMS systems because of its unique backend
  - Provides a what you see is what you get kind of authoring experience
  - Everything is stored in a special type of file system.
  - AEM renders the file system to form web pages

## How we will evolve this philosophy

- Build based off of more modern technologies
  - **React**
    - Frontend components will be based off of react
    - Will be used to build authoring frontend
    - developers can build custom authoring experie
  - **Node.js**
    - Will be used as backend
  - **Unix Filesystem**
    - **json** for meta-data
- A Focus on clean and simple authoring and developing experience
- Electron and browser based authoring client
- Focus on vscode-based development tools

## Workflow

- Developers build react components in `components/`
- Authors would construct websites out of components, these files are stored as `json` files.
- Fleksi will parse the xml file and generate 

## File System

- Files are stored as a unix file system, this is to offer fliexibility in what is allowed to stored in the cms backend
- Metadata for folders are stored as `meta.json`. These provide extra information for the cms system to handle data. for example, the rendering system will look for special fields inside the `meta.json` folder 
-

### Structure

- `components/`
  - `Header.jsx`
  - `Content.jsx`
  - `Footer.jsx`
  - `Image.jsx`
  - `Text.jsx`
  - `Page.jsx`
  - `ProductPage.jsx`
- `root/`: authorable zone
  - `meta.json`

    ```json
    {
        component: "Page"
    }
    ```

  - `Header/`
  - `Content/`
    - `Heading1/`
      - `meta.json`

        ```json
        {
            text: "Heading Text"
        }
        ```

    - `Image/`
      - `meta.json`

        ```json
        {
            image: "/assets/image1.png"
        }
        ```

    - `Text/`
      - `meta.json`

        ```json
        {
            text: "lorem ipsum"
        }
        ```

  - `Footer/`
    - `meta.json`
  - `assets/`
    - `image1.png`
  - `products/`
    - `product1/`
      - `ProductPage`...
    - `product2/`
      - `ProductPage`...
- `api/`

## Rendering System

- Based on Flex Box
- 
