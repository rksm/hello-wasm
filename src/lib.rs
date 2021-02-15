use log::{info, Level};
use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{Document, HtmlElement, Window};

pub fn window() -> Window {
    web_sys::window().expect("no global `window` exists")
}

pub fn document() -> Document {
    window().document().expect("no global `document` exists")
}

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    console_error_panic_hook::set_once();
    console_log::init_with_level(Level::Debug).expect("init logger");

    info!("Up and running");

    let app = document()
        .query_selector("#app")
        .expect("querySelector call")
        .expect("cannot find app element")
        .dyn_into::<HtmlElement>().expect("app HtmlElement cast");
    app.set_inner_text("Hello from Rust!");

    Ok(())
}
