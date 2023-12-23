# Asset dependency adder for ELM

1. Install `parcel-elm-asset-dependency` with 
    ```sh
    npm install -D parcel-elm-asset-dependency
    ```
1. Simply add `parcel-elm-asset-dependency` to the transformers like so,

    ```json
    {
        "transformers": {
            "*.js": ["parcel-elm-asset-dependency", "..."]
        }
    }
    ```
1. In your elm files, you can prefix any asset with `ASSET_URL:[relative_path_to_asset]`

    <br/>
    For example,

    ```elm
    view : Model -> Html Msg
    view model =
        div []
            [ img 
                [ src "ASSET_URL:../assets/red-bolt.png" ] 
                [] 
            , img 
                [ src "ASSET_URL:../assets/soldier.jpeg?width=250&quality=50" ] 
                [] 
            ]
    ```

## Do not generate URLs dynamically like

```elm

photo : String
photo = "ASSET_URL:" ++ "../assets/jane-doe.jpeg"

photo2 : Bool -> String
photo2 canPickHuman = "ASSET_URL:" ++ 
    ( if canPickHuman then 
        "../assets/john-doe.jpeg"
      else 
        "../assets/dog.jpeg"
    )

photo3 : Bool -> String
photo3 canPickHuman = 
    ( if canPickHuman then 
        "ASSET_URL:../assets/john-doe.jpeg"
      else 
        "ASSET_URL:../assets/dog.jpeg"
    )

```

## Recommended

```elm

johnDoe : String
johnDoe = "ASSET_URL:../assets/jane-doe.jpeg"

dog : String
dog = "ASSET_URL:../assets/dog.jpeg"

smallDog : String
smallDog = "ASSET_URL:../assets/dog.jpeg?width=250&quality=50"

dynamicallyPickImageSrc : Bool -> String
dynamicallyPickImageSrc canPickHuman = 
    ( if canPickHuman then 
        johnDoe
      else 
        smallDog
    )

makeImage : Bool -> Html msg 
makeImage canPickHuman = 
    img [ src (dynamicallyPickImageSrc canPickHuman) ] []

```
