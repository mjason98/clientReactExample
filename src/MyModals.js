import React from "react";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Modal , ModalBody, Form } from "react-bootstrap";

export function UpdateLessonsModal(props){
    // updateValues
	if (!props.show)
		return ('');
	else{
		
        const _H1 = new Date(props.updateValues.dateIni);
        const _Dur = (new Date(props.updateValues.dateFin) - _H1) /60000;

        let sele_prof = null;
        let sele_top = null;

		const names_options  = props.profesors.map(p => {
                            if (p.name === props.updateValues.prophesor)
                                sele_prof = p.id;
                            return(<option   key={p.id} value={p.id} className="selectD-content">{p.name}</option>)});

		const topics_options = props.topics.map(t => {
                            if (t.name === props.updateValues.name)
                                sele_top = t.id;
                            return(<option key={t.id} value={t.id} className="selectD-content">{t.name}</option>)});

		const hora = Array(12).fill(0).map((_ , i) => <option  key={i} value={i+7} className="selectD-content">{i+7}</option>);
		const mins = Array(4).fill(0).map((_ , i) => <option  key={i} value={i*15} className="selectD-content">{i*15}</option>);

		return ( <div className="container">
		<Modal 
		show={props.show}
		size="lg"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		Update lesson with values:
		</div>
		</ModalHeader>
		<ModalBody>
		<Form onSubmit={(v) => props.handleUpdateLesson(v)}>
			<div className="row">
				{/*name*/}
				<div className="col-sm-4 form-col">
				<label htmlFor="topic" className="eventt-author text-in-form"> Subject </label> <p/>
				<select  id="topic" name="topic" className="form-sele" defaultValue={sele_top} required>
					{topics_options}	
				</select>
				</div>

				{/* profesor */}
				<div className="col-sm-4 form-col">
				<label htmlFor="name" className="eventt-author text-in-form"> Given by </label> <p/>
				<select id="name" name="name" className="form-sele" defaultValue={sele_prof} required>
					{names_options}
				</select>
				</div>

				{/* horario */}
				<div className="col-sm-4 form-col">
					<label htmlFor="hora" className="eventt-author text-in-form"> Time and Duration</label> <p/>
					<select id="horaI" name="horaI" className="form-sele time-sele time-row" required defaultValue={_H1.getHours()}>
						{hora}
					</select>
					<div className="sep-text time-row" >:</div>
					<select id="minI" name="minsI" className="form-sele time-sele time-row" required defaultValue={_H1.getMinutes()}>
						{mins}
					</select>
					<div className="sep-text time-row" >and last</div>
					<select id="dur" name="dur" className="form-sele time-sele time-row" required defaultValue={_Dur}>
						<option value={45}>45 mins</option>
						<option value={60}>1 hour </option>
						<option value={90}>1&#189; hour</option>
						<option value={120}>2 hours</option>
						<option value={180}>3 hours</option>
					</select>
				</div>
				<div className="row">
				<div className="col-sm-9 form-col">
				<label htmlFor="desc" className="eventt-author"> Description </label> <p/>
				<textarea defaultValue={props.updateValues.description} id="desc" name="desc" className="form-BT" maxLength="256" placeholder="this one will be good"/>
				</div>
				<div className="col-sm-3 form-col">
					<button className="btn-ok red" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok" type="submit">OK</button>
				</div>
				</div>
			</div>
		</Form>
		
		</ModalBody>
		</Modal>
		</div>);
	}
}

export function DeleteLessonModal(props){
    if (!props.show)
		return ('');
        return ( <div className="container">
		<Modal 
		show={props.show}
		size="sm"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		Delete this lesson?
		</div>
		</ModalHeader>
		<ModalBody>
            <div className="col-sm-12 form-col">
                <button className="btn-ok red simple-margin" onClick={() => props.onHide()}>NO!</button>
                <button className="btn-ok simple-margin" onClick={() => props.handleDelete()}>OK :(</button>
            </div>
		</ModalBody>
		</Modal>
		</div>);
}

export function LessonsModal(props){
	if (!props.show)
		return ('');
	else{
		// pedir prof y topica
		const names_options  = props.profesors.map(p => <option key={p.id} value={p.id} className="selectD-content">{p.name}</option>)
		const topics_options = props.topics.map(t => <option key={t.id} value={t.id} className="selectD-content">{t.name}</option>)

		const hora = Array(12).fill(0).map((_ , i) => <option key={i} value={i+7} className="selectD-content">{i+7}</option>);
		const mins = Array(4).fill(0).map((_ , i) => <option  key={i} value={i*15} className="selectD-content">{i*15}</option>);

		return ( <div className="container">
		<Modal 
		show={props.show}
		size="lg"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		New Lesson
		</div>
		</ModalHeader>
		<ModalBody>
		<Form onSubmit={(v) => props.handleNewLesson(v)}>
			<div className="row">
				{/*name*/}
				<div className="col-sm-4 form-col">
				<label htmlFor="topic" className="eventt-author text-in-form"> Subject </label> <p/>
				<select  id="topic" name="topic" className="form-sele" required>
					{topics_options}	
				</select>
				</div>

				{/* profesor */}
				<div className="col-sm-4 form-col">
				<label htmlFor="name" className="eventt-author text-in-form"> Given by </label> <p/>
				<select id="name" name="name" className="form-sele" required>
					{names_options}
				</select>
				</div>

				{/* horario */}
				<div className="col-sm-4 form-col">
					<label htmlFor="hora" className="eventt-author text-in-form"> Time and Duration</label> <p/>
					<select id="horaI" name="horaI" className="form-sele time-sele time-row" required>
						{hora}
					</select>
					<div className="sep-text time-row" >:</div>
					<select id="minI" name="minsI" className="form-sele time-sele time-row" required>
						{mins}
					</select>
					<div className="sep-text time-row" >and last</div>
					<select id="dur" name="dur" className="form-sele time-sele time-row" required>
						<option value={45}>45 mins</option>
						<option value={60}>1 hour </option>
						<option value={90}>1&#189; hour</option>
						<option value={120}>2 hours</option>
						<option value={180}>3 hours</option>
					</select>
				</div>
				<div className="row">
				<div className="col-sm-9 form-col">
				<label htmlFor="desc" className="eventt-author"> Description </label> <p/>
				<textarea id="desc" name="desc" className="form-BT" maxLength="256" placeholder="this one will be good"/>
				</div>
				<div className="col-sm-3 form-col">
					<button className="btn-ok red" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok" type="submit">OK</button>
				</div>
				</div>
			</div>
		</Form>
		
		</ModalBody>
		</Modal>
		</div>);
	}
}

export function ProfessorModal(props){
	if (!props.show)
		return ('');
	else{
		// pedir prof y topica
		return ( <div className="container">
		<Modal 
		show={props.show}
		size="sm"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		New Professor
		</div>
		</ModalHeader>
		<ModalBody>
		<Form onSubmit={(v) => props.handleNewProfessor(v)}>
			<div className="row">
				{/* profesor */}
				<div className="col-sm-12 form-col">
				<label htmlFor="name" className="eventt-author text-in-form"> Name </label> <p/>
				<input type="text" id="name" name="name" className="form-text" required placeholder="Sr. Someone"/>
				</div>
				<div className="col-sm-12 form-col">
					<button className="btn-ok red simple-margin" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok simple-margin" type="submit">OK</button>
				</div>
			</div>
		</Form>
		
		</ModalBody>
		</Modal>
		</div>);
	}
}
export function UpdateProfessorModal(props){
	if (!props.show)
		return ('');
	else{
		// pedir prof y topica
		return ( <div className="container">
		<Modal 
		show={props.show}
		size="sm"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		Change name to:
		</div>
		</ModalHeader>
		<ModalBody>
		<Form onSubmit={(v) => props.handleUpdateProf(v)}>
			<div className="row">
				{/* profesor */}
				<div className="col-sm-12 form-col">
				<label htmlFor="name" className="eventt-author text-in-form"> New name </label> <p/>
				<input defaultValue={props.value.name} type="text" id="name" name="name" className="form-text"/>
				</div>
				<div className="col-sm-12 form-col">
					<button className="btn-ok red simple-margin" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok simple-margin" type="submit">OK</button>
				</div>
			</div>
		</Form>
		
		</ModalBody>
		</Modal>
		</div>);
	}
}

export function DeleteProfModal(props){
    if (!props.show)
		return ('');
        return ( <div className="container">
		<Modal 
		show={props.show}
		size="sm"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		Delete this one?
		</div>
		</ModalHeader>
		<ModalBody>
			<div className="col-sm-12 form-col">
				...be aware, this action will erase also lessons with this value.
			</div>
            <div className="col-sm-12 form-col">
                <button className="btn-ok red simple-margin" onClick={() => props.onHide()}>NO!</button>
                <button className="btn-ok simple-margin" onClick={() => props.handleDelete()}>OK :(</button>
            </div>
		</ModalBody>
		</Modal>
		</div>);
}