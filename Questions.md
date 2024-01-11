# What is the difference between Component and PureComponent? Give an example where it might break my app.

- A Component always rerenders when the state is set, regardless of if the value changed or not. 
- While a PureComponent checks if the value of the new state is different from the previous state before rerendering.
a PureComponent does a shallow comparison of the new state and previous state.  
- PureComponent implements a `shouldComponentUpdate` method to check if there should be a rerender or not.

Example:

Suppose we have a list of items, and each item is represented by a component. If the items are objects, and we modify one property of an item without creating a new object reference, a regular Component might not detect the change, causing unnecessary rerenders. Here PureComponents can help to avoid unnecessary rerenders. But we have to be careful to not mutate the object directly otherwise the the shallow comparison wont work. 

- To answer the question "Give an example where it might break my app", as mentioned in the above example, it might break if we mutate the object directly.


# Context + ShouldComponentUpdate might be dangerous. Why is that?

- I think the reason this might be dangerous in a scenario where the Context's value is changing a bit frequently. So it would cause unnecessary rerenders because the object reference would change every time. 

- Let's say for example we have a context that provides user authentication information. If the authentication state is updated frequently but the user remains the same, using `shouldComponentUpdate` might cause components to re-render unnecessarily.

- This will make debugging more complex as well as we might need to understand how our context updates are effecting the shallow comparison in `shouldComponentUpdate`.

# Describe 3 ways to pass information from a component to its PARENT.

Here are the ways that I can think of for passing information from Component to Parent.

1. Pass a function as a prop to the child that takes the information as a parameter. So we can call that function from the child component, passing the information. The parent would be able to access the information within that function. 

2. We could make the information available in the parent only and pass it down to the child. For example we can keep the state in parent component and pass it to the child as a prop. So basically using a Controlled Component pattern. 

3. We can also use a Context to pass the information to the parent. If both parent and child are both under the same context then the child could update the information in the context and the parent can access it. We could also do something similar using global state management tools like redux. 

# Give 2 ways to prevent components from re-rendering.

1. One way to prevent the components from rerendering is what I described above in the `shouldComponentUpdate` function. We could use that to prevent the rerendering. By default in Components the `shouldComponentUpdate` always returns `true`, but we can implement this function to return `true` only under certain condtions. This only works for class components though. 

2. Second way is to use Memoization, this used in many modern React applications. We can use the `useMemo` hook for that to only cause the rerender when a certain state changes. We can give a dependency array as a second parameter of the `useMemo` hook to define which state changes should cause the rerender. This only works with function components. 


# What is a fragment and why do we need it? Give an example where it might break my app.

- A Frangment is basically just an empty wrapper that doesn't have any of it's own properties.
- It can be used when we want to return multiple elements from a component but we don't want to add an extra wrapper like a `div` etc.
- We can also use them in places where we for example want a parent to determine the styling of a child and we dont want the child to interfer with that styling. 
- They can also help in keeping the `HTML` structure clean.

# Give 3 examples of the HOC pattern.

- A Higher Order Component in React is used for wrapping a component with another component to enhance or modify its behavior. Here are three examples of HOCs:

1. The `withRouter` HOC used in `react-router` is used to provide routing properties to the child component.

2. The `connect` HOC in `react-redux` is used to provide certain functions to a react component to make some redux fucntionality available to the child component. Like state and dispatch etc. 

3. The `withStyles` HOC in `MUI` is used inject custom styles into compoments. 



# What's the difference in handling exceptions in promises, callbacks and async...await?

1. Promises: 
- In promises we use the `.catch()` block to handle exceptions. 
- Promises can propogate errors if there are multiple `.then()` blocks. So for example if there is a chain of `.then` blocks, error in any single one of them will take the flow to the nearest `.catch()` block.
- This makes error handling much more readable and mantainable. 
- It helps avoid what we call a callback hell. (I will describe this further in the callbacks description)

2. Callbacks:
- In callbacks, errors are usually passed as a parameter to the callback function. So we have to check for errors in the callback function.
- This makes it essential to check for errors in each callback function so this way error handling can become deeply nested within each callback. This is what we call a callback hell. 

3. Async/Await:
- In `async/await` Errors are caught using `try...catch` blocks. This allows us to handle errors in a same way we would do if we had a synchronous logic. So it is much more readable. 


# How many arguments does setState take and why is it async.

- The `setState` function is used in class components. It takes 2 arguments. 
- The first argument is the new state and the second one is a callback function, that is called once the state is successfully update. 

- The reason why it is async is because this is how React works. It helps React to prevent unnecessary rerenders and consistency. It also helps React to priortize rendering. 

# List the steps needed to migrate a Class to Function Component.

Here are the steps that we need to take to convert Class components to Function Components.

- Change the class into a function.

- Update the state method to hooks. This can be done by using the `useState` hook in the function component. In class components we have the whole state in a single object, which is not a best practice in function component. So it is best to break down the state. 

- Change all the life cycle methods to the new function format. Here is how we can convert each of them. 

   - `componentDidMount`  -> `useEffect` with an empty dependency array. 

   - `componentWillUnmount` -> in the same useEffect as above we can add a return to perfom some action when the component unmount. 

   - `componentDidUpdate` -> `useEffect` with the dependency array containing the state that we were using in the componentDidUpdate. We could just remove the dependency array to copy exact functionality of `componentDidUpdate` but that is not considered a good practice in function components. 

- We need to remove `this.props` and instead use `props` as an object from the functions arguments. 

- We also need to remove the `this` keyword from other places as well, like from the `onClick` events etc.

- If we are using any `refs` then we need to convert it to use the `useRef` hook instead. 

- There are many other things that could be considered while converting a component depending on how the components are setup. But we have to be careful and not copy the exact logic that is being used in the class component, we could create a new logic that would be much more suitable for function component. 

# List a few ways styles can be used with components.

1. Using inline styles
2. CSS
3. CSS in JS libraries like styled-components etc
4. Component libraries like Material-UI etc

# How to render an HTML string coming from the server.

- We can render HTML string by using providing a `dangerouslySetInnerHTML` prop to an element and giving it the HTML string as the value.   

 

