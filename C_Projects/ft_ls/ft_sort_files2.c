/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_5.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/08 16:01:11 by blaine            #+#    #+#             */
/*   Updated: 2020/06/16 21:27:11 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

t_file	*ft_merge_sort(t_file *list, t_opt *opt)
{
	t_file	*first;
	t_file	*second;
	t_file	*middle;
	t_file	*middle_next;
	t_file	*sorted_list;

	if (list == NULL || list->next == NULL)
		return (list);
	middle = ft_find_middle(list);
	middle_next = middle->next;
	middle->next = NULL;
	first = ft_merge_sort(list, opt);
	second = ft_merge_sort(middle_next, opt);
	if (opt->t)
		sorted_list = ft_merge_list_t(first, second, opt);
	else
		sorted_list = ft_merge_list(first, second, opt);
	return (sorted_list);
}

void	ft_swap_r(t_file **first, t_file **second, t_file **tmp, int i)
{
	if (i && ft_strcmp((*first)->data->name, (*second)->data->name) > 0)
	{
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else if (i == 1)
	{
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
	if (i == 1)
		return ;
	if (ft_strcmp((*first)->data->name, (*second)->data->name) > 0)
	{
		(*tmp)->next = (*first);
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else
	{
		(*tmp)->next = (*second);
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
}

void	ft_swap_n(t_file **first, t_file **second, t_file **tmp, int i)
{
	if (i && ft_strcmp((*first)->data->name, (*second)->data->name) < 0)
	{
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else if (i == 1)
	{
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
	if (i == 1)
		return ;
	if (ft_strcmp((*first)->data->name, (*second)->data->name) < 0)
	{
		(*tmp)->next = (*first);
		(*tmp) = (*first);
		(*first) = (*tmp)->next;
	}
	else
	{
		(*tmp)->next = (*second);
		(*tmp) = (*second);
		(*second) = (*tmp)->next;
	}
}

t_file	*ft_merge_list(t_file *first, t_file *second, t_opt *opt)
{
	t_file *tmp;
	t_file *start;

	if (first == NULL)
		return (second);
	if (second == NULL)
		return (first);
	if (opt->r == 0)
		ft_swap_n(&first, &second, &tmp, 1);
	else
		ft_swap_r(&first, &second, &tmp, 1);
	start = tmp;
	while (first != NULL && second != NULL)
	{
		if (opt->r == 0)
			ft_swap_n(&first, &second, &tmp, 0);
		else
			ft_swap_r(&first, &second, &tmp, 0);
	}
	if (first == NULL)
		tmp->next = second;
	if (second == NULL)
		tmp->next = first;
	return (start);
}
